import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 

interface User {
  id?: number;
  name: string;
  email: string;
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
  newUser: User = { name: '', email: '' };
  editMode: boolean = false;
  selectedUserId: number | null = null;

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.http.get<User[]>('https://localhost:4001/api/User').subscribe((data) => {
      this.users = data;
    });
  }

  saveUser(): void {
    if (this.editMode && this.selectedUserId !== null) {
      this.newUser.id = this.selectedUserId;
      this.http
        .put(`https://localhost:4001/api/User/${this.selectedUserId}`, this.newUser)
        .subscribe(() => {
          this.loadUsers();
          this.resetForm();
        });
    } else {
      this.http.post('https://localhost:4001/api/User', this.newUser).subscribe(() => {
        this.loadUsers();
        this.resetForm();
      });
    }
  }

  editUser(user: User): void {
    this.newUser = { name: user.name, email: user.email };
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
    this.newUser = { name: '', email: '' };
    this.editMode = false;
    this.selectedUserId = null;
  }
}
