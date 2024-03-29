module.exports.validateCreateTenantInput = (
  name,
  email,
  institution,
  type
) => {
  console.log(name);
  const errors = {};
  if (name.trim() === '') {
    errors.name = 'name must not be empty';
  }
  if (institution.trim() === '') {
      errors.institution = 'institution must not be empty';
  }
  if (type.length === 0) {
      errors.type = 'type must not be empty';
  }
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regEx = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i ;  ///^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateCreateAuditorInput = (
  name,
  role,
  email,
  institution,
) => {
  const errors = {};
  if (name.trim() === '') {
    errors.name = 'name must not be empty';
  }
  if (role.trim() === '') {
    errors.role = 'name must not be empty';
  }
  if (institution.trim() === '') {
      errors.institution = 'institution must not be empty';
  }
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regEx = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i ;  ///^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};



// validateRgisterInput to ensure email is a valid email.
module.exports.validateRegisterInput = (
  password,
  confirmPassword
) => {
  const errors = {};

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
