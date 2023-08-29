import { useReducer, useState, useEffect, useRef } from "react";
const nameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: "", isValid: null };
};

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: null };
};
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: "", isValid: null };
};

const Register = ({ onRouteChange, loadUser }) => {
  const [nameState, dispatchName] = useReducer(nameReducer, {
    value: "",
    isValid: null,
  });

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const [formIsValid, setFormIsValid] = useState(false);
  const [isError, setIsError] = useState(false);

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        nameState.isValid && emailState.isValid && passwordState.isValid
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [nameState.isValid, emailState.isValid, passwordState.isValid]);

  const onInputChange = (event) => {
    switch (event.target.type) {
      case "text":
        dispatchName({ type: "USER_INPUT", val: event.target.value });
        break;
      case "email":
        dispatchEmail({ type: "USER_INPUT", val: event.target.value });
        break;
      default:
        dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    }
  };

  const onInputBlur = (event) => {
    switch (event.target.type) {
      case "name":
        dispatchName({ type: "INPUT_BLUR", val: event.target.value });
        break;
      case "email":
        dispatchEmail({ type: "INPUT_BLUR", val: event.target.value });
        break;
      default:
        dispatchPassword({ type: "INPUT_BLUR", val: event.target.value });
    }
  };

  const onSubmitRegister = () => {
    if (formIsValid) {
      setIsError(false);
      //Change "https://smartbrainapi-vcz5.onrender.com/register" to "http://localhost/register" if you plan to run it locally.
      fetch("https://smartbrainapi-vcz5.onrender.com/register", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameState.value,
          email: emailState.value,
          password: passwordState.value,
        }),
      })
        .then((response) => response.json())
        .then((user) => {
          if (user.id) {
            loadUser(user);
            onRouteChange("home");
          } else {
            setIsError(true);
          }
        });
    } else {
      if (!nameState.isValid) {
        nameInputRef.current.focus();
      } else if (!emailState.isValid) {
        emailInputRef.current.focus();
      } else {
        passwordInputRef.current.focus();
      }
    }
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">
                Name
              </label>
              <input
                ref={nameInputRef}
                onChange={onInputChange}
                onBlur={onInputBlur}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email">
                Email
              </label>
              <input
                ref={emailInputRef}
                onChange={onInputChange}
                onBlur={onInputBlur}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                ref={passwordInputRef}
                onChange={onInputChange}
                onBlur={onInputBlur}
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
              />
            </div>
          </fieldset>
          {isError && <p className="mb3 f3 dark-pink">Invalid Email</p>}
          <div className="">
            <input
              onClick={onSubmitRegister}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="button"
              value="Register"
            />
          </div>
        </form>
      </main>
    </article>
  );
};

export default Register;
