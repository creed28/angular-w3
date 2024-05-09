import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

interface Note {
  id: number,
  title: string,
  description: string
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private noteList: Note[] = [];  

  public isValid: boolean = true;
  public isEditable: boolean = false;
  public selectedNote: number = -1;
  public titleMinSize: number = 5;
  public descriptionMinSize: number = 7;
  public modelTitle: string = "";
  public modelDescription: string = "";

  public addNote(): void {
    if (this.isInputValid()) {
      const newNote: Note = {
        id: this.noteList.length,
        title: this.modelTitle,
        description: this.modelDescription
      };
      
      this.noteList.push(newNote);
      this.resetTempData();
    }
  }

  public editNote(): void {
    if (this.isInputValid()) {
      this.noteList[this.selectedNote].title = this.modelTitle;
      this.noteList[this.selectedNote].description = this.modelDescription;
      this.resetTempData();
    }
  }

  public deleteNote(id: number): void {
    this.noteList.splice(id, 1);
    this.resetTempData();
  }

  public selectNote(id: number): void {
    this.selectedNote = id;
  }

  public isInputValid(): boolean {
    this.isValid = false;
    return this.modelTitle.length > this.titleMinSize && this.modelDescription.length > this.descriptionMinSize;
  }

  public addForEdit(id: number): void {
    this.isEditable = true;
    this.modelTitle = this.noteList[id].title;
    this.modelDescription = this.noteList[id].description;
  }

  public getIsSelected(id: number): boolean {
    return this.selectedNote === id;
  }

  public getNotes(): Note[] {
    return this.noteList;
  }

  private resetTempData(): void {
    this.selectedNote = -1;
    this.modelTitle = "";
    this.modelDescription = "";
    this.isEditable = false;
    this.isValid = true;
  }
}
