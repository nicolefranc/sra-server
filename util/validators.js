module.exports.validateCreateInput = (
  tenantId,
  name,
  institution
) => {
  const errors = {};
  if (name === '') {
    errors.name = 'name must not be empty';
  }
  if (tenantId === '') {
    errors.id = 'id must not be empty';
  }
  if (institution === '') {
      errors.institution = 'institution must not be empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};



// validateRgisterInput to ensure email is a valid email.
module.exports.validateRegisterInput = (
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  // if (username.trim() === '') {
  //   errors.username = 'Username must not be empty';
  // }
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }
  if (password === '') {
    errors.password = 'Password must not empty';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateLoginInput = (email, password) => {
  const errors = {};
  if (email.trim() === '') {
    errors.email = 'Username must not be empty';
  }
  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};
