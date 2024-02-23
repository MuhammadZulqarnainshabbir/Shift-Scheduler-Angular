import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent {
  myForm: FormGroup;
  nurses: string[] = [];
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  shifts = ['Day Shift', 'Late Shift', 'Night Shift'];
schedule: { [day: string]: { [shift: string]: string } } = {};
errorMessage: string = '';

constructor(private formbuilder: FormBuilder) {
    this.myForm = this.formbuilder.group({
        numnurse: ['', Validators.required],
    });
}

  fillNurses() {
    this.errorMessage = '';

    try {
      const numnurse = +this.myForm.get('numnurse')?.value;

      if (isNaN(numnurse) || numnurse <= 0) {
        throw new Error('Please enter a valid number of nurses.');
      }

      this.nurses = [];
      for (let i = 1; i <= numnurse; i++) {
        this.nurses.push('Nurse ' + i);
      }

      this.assignNurses();
    } catch (error) {
        this.errorMessage = (error as Error).message;
    }
  }

  assignNurses() {
    for (const day of this.daysOfWeek) {
      this.schedule[day] = {};

      for (const shift of this.shifts) {
        const availableNurses = this.nurses.slice();
        this.shuffleArray(availableNurses);
        const assignedNurse = availableNurses.pop() as string;

        this.schedule[day][shift] = assignedNurse;
      }
    }
  }

  private shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
