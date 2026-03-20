export class User {
  constructor({ id, name, email, password, role = "subscriber" }) {
    this.id        = id || Date.now();
    this.name      = name;
    this.email     = email;
    this.password  = password;
    this.role      = role;
    this.avatar    = name?.charAt(0).toUpperCase();
    this.avatarImg = null;
    this.createdAt = new Date().toISOString();
  }

  login(password) {
    return this.password === password;
  }

  logout() {
    console.log(`${this.name} logged out.`);
  }

  updateInfo({ name, email, avatarImg }) {
    if (name)      { this.name = name; this.avatar = name.charAt(0).toUpperCase(); }
    if (email)     this.email = email;
    if (avatarImg) this.avatarImg = avatarImg;
  }

  changePassword(oldPassword, newPassword) {
    if (this.password !== oldPassword) return { success: false, message: "Incorrect current password." };
    this.password = newPassword;
    return { success: true };
  }
}
