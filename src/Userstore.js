const users = [];

export const registerUser = ({ name, email, password, role = "customer" }) => {
  const exists = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  if (exists) {
    return { success: false, message: "Email already registered." };
  }

  const user = {
    id: Date.now(),
    name,
    email,
    password,
    role,
    avatar: name.charAt(0).toUpperCase(),
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  return { success: true, user };
};

export const loginUser = ({ email, password }) => {
  const user = users.find(
    (entry) =>
      entry.email.toLowerCase() === email.toLowerCase() &&
      entry.password === password
  );

  if (!user) {
    return { success: false, message: "Invalid email or password." };
  }

  return { success: true, user };
};

export const getUsers = () => users;

export const updateUser = (id, updates) => {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return { success: false, message: "User not found." };
  }

  if (updates.email) {
    const taken = users.find(
      (user) =>
        user.email.toLowerCase() === updates.email.toLowerCase() &&
        user.id !== id
    );

    if (taken) {
      return { success: false, message: "Email already in use." };
    }
  }

  if (updates.newPassword) {
    if (users[index].password !== updates.oldPassword) {
      return { success: false, message: "Current password is incorrect." };
    }

    updates.password = updates.newPassword;
    delete updates.newPassword;
    delete updates.oldPassword;
  }

  if (updates.name) {
    updates.avatar = updates.name.charAt(0).toUpperCase();
  }

  Object.assign(users[index], updates);
  return { success: true, user: users[index] };
};
