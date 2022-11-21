export class AuthService{
  private isAuth = false;

  login(){
    this.isAuth = true;
  }

  logout(){
    this.isAuth=false;
  }

  isLoggedIn(){
    return this.isAuth;
  }
}
