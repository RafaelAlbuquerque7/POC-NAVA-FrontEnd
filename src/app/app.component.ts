import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 

interface User {
  id?: number;
  name: string;
  email: string;
  dataNascimento: Date | null;
  senha: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private http = inject(HttpClient);
  users: User[] = [];
  newUser: User = { name: '', email: '', dataNascimento: null, senha: '' };
  editMode: boolean = false;
  selectedUserId: number | null = null;

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.http.get<User[]>('https://localhost:4001/api/User').subscribe((data) => {
      this.users = data.map(user => ({
        ...user,
        dataNascimento: user.dataNascimento ? user.dataNascimento : null // Manter como string
      }));
    });
  }
  

  saveUser(): void {
    const userToSave = { 
      ...this.newUser, 
      dataNascimento: this.newUser.dataNascimento || null // A data é uma string, não precisa de conversão
    };
  
    if (this.editMode && this.selectedUserId !== null) {
      this.newUser.id = this.selectedUserId;
  
      this.http
        .put(`https://localhost:4001/api/User/${this.selectedUserId}`, userToSave)
        .subscribe(() => {
          this.loadUsers();
          this.resetForm();
        });
    } else {
      this.http.post('https://localhost:4001/api/User', userToSave).subscribe(() => {
        this.loadUsers();
        this.resetForm();
      });
    }
  }
  

  editUser(user: User): void {
    this.newUser = { name: user.name, email: user.email, dataNascimento: user.dataNascimento, senha: user.senha };
    this.selectedUserId = user.id || null;
    this.editMode = true;
  }

  deleteUser(id: number | undefined): void {
    if (id === undefined) {
      console.error('ID is undefined. Cannot delete user.');
      return;
    }

    this.http.delete(`https://localhost:4001/api/User/${id}`).subscribe(() => {
      this.loadUsers();
    });
  }

  resetForm(): void {
    this.newUser = { name: '', email: '', dataNascimento: null, senha: '' };
    this.editMode = false;
    this.selectedUserId = null;
  }
}
