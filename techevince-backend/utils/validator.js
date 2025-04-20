const validateRequest = (req, res, next, schema, reqPart = "body") => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
  };
  const { error, value } = schema.validate(req[reqPart], options);
  if (error) {
    return res.status(400).json({ 
      data: null, 
      message: "Validation error", 
      error: { 
        details: error.details, 
        message: `JOI Validation error: ${error.details.map(x => x.message).join(', ')}` 
      } 
    });
  } else {
    req[reqPart] = value;
    next();
  }
}

module.exports.validateRequest = validateRequest;