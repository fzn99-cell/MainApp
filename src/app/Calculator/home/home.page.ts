import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class HomePage implements OnInit {
  num1: number | null = null;
  num2: number | null = null;
  res: number = 0;

  constructor() {}

  ngOnInit() {
    // Initialize with default values if needed
    console.log('Calculator component initialized');
  }

  // Parse input safely
  getNumber1(): number {
    return this.num1 !== null ? Number(this.num1) : 0;
  }

  getNumber2(): number {
    return this.num2 !== null ? Number(this.num2) : 0;
  }

  // Operation methods with console logging for debugging
  addition(): void {
    console.log('Addition method called');
    console.log('Inputs:', this.num1, this.num2);
    this.res = this.getNumber1() + this.getNumber2();
    console.log('Result:', this.res);
  }

  subtraction(): void {
    console.log('Subtraction method called');
    this.res = this.getNumber1() - this.getNumber2();
  }

  multiplication(): void {
    console.log('Multiplication method called');
    this.res = this.getNumber1() * this.getNumber2();
  }

  division(): void {
    console.log('Division method called');
    if (this.getNumber2() !== 0) {
      this.res = this.getNumber1() / this.getNumber2();
      // Limit decimal places for cleaner display
      if (!Number.isInteger(this.res)) {
        this.res = parseFloat(this.res.toFixed(4));
      }
    } else {
      alert('Cannot divide by zero!');
    }
  }
}