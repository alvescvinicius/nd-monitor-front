import { MovimentacaoPayload } from './../../services/movimentacao.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcelReaderService } from '../../services/excel-reader.service';
import { MovimentacaoService } from '../../services/movimentacao.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  importando: boolean = false;
  concluido: boolean = false;
  movimentacoes: MovimentacaoPayload[] = [];

  constructor(
    private excelService: ExcelReaderService,
    private movimentacaoService: MovimentacaoService
  ) {}

  async onFileChange(event: any): Promise<void> {
    this.concluido = false;
    this.importando = true;
    let file = event.target.files[0];

    if (file) {
      try {
        const data = await this.excelService.readExcelFile(file);
        this.movimentacoes = data;

        for (const movimentacao of this.movimentacoes) {
          try {
            const res = await firstValueFrom(
              this.movimentacaoService.criarMovimentacao(movimentacao)
            );
            console.log('Sucesso:', res);

          } catch (err) {
            console.error('Erro ao enviar movimentação:', movimentacao, err);
          }
        }
        this.concluido = true;
      } catch (err) {
        console.error('Erro ao ler arquivo:', err);
      } finally {
        file = null;
        if (event.target) {
          event.target.value = '';
        }
        this.importando = false;

      }
    }
  }
}
