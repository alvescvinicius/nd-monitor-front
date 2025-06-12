import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcelReaderService } from '../../services/excel-reader.service';

@Component({
  selector: 'app-home',
  imports: [ CommonModule ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

jsonData: any[] = [];

  constructor(private excelService: ExcelReaderService) {}

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.excelService.readExcelFile(file).then(data => {
        this.jsonData = data;
        console.log('JSON:', data);
      });
    }
  }

}
