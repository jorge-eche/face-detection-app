import { useReducer, useState, useEffect, useRef } from "react";

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

const SignIn = ({ onRouteChange, loadUser, loadingHandler }) => {
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

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailState.isValid, passwordState.isValid]);

  const onInputChange = (event) => {
    switch (event.target.type) {
      case "email":
        dispatchEmail({ type: "USER_INPUT", val: event.target.value });
        break;
      default:
        dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    }
  };

  const onInputBlur = (event) => {
    if (event.target.type === "email") {
      dispatchEmail({ type: "INPUT_BLUR" });
    } else {
      dispatchPassword({ type: "INPUT_BLUR" });
    }
  };

  const onSubmitSignIn = () => {
    if (formIsValid) {
      setIsError(false);
      loadingHandler();
      //Change "https://smartbrainapi-vcz5.onrender.com/signin" to "http://localhost/signin" if you plan to run it locally.
      fetch("https://smartbrainapi-vcz5.onrender.com/signin", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailState.value,
          password: passwordState.value,
        }),
      })
        .then((response) => response.json())
        .then((user) => {
          loadingHandler();
          if (user.id) {
            loadUser(user);
            onRouteChange("home");
          } else {
            setIsError(true);
          }
        });
    } else {
      if (!emailState.isValid) {
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
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                ref={emailInputRef}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onInputChange}
                onBlur={onInputBlur}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                ref={passwordInputRef}
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={onInputChange}
                onBlur={onInputBlur}
              />
            </div>
          </fieldset>
          {isError && (
            <p className="mb3 f3 dark-pink">Wrong email or password</p>
          )}
          <div className="">
            <input
              onClick={onSubmitSignIn}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="button"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={() => onRouteChange("register")}
              href="#0"
              className="f6 link dim black db pointer"
            >
              Register
            </p>
          </div>
        </form>
      </main>
    </article>
  );
};

export default SignIn;
