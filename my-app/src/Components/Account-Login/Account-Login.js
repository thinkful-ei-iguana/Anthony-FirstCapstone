import React from "react";
import "../../Styles/Account-Login.css";
import RecentResults from "../Recent-Results/Recent-Results";

export default class Login extends React.Component {
  render() {
    return (
      <div class="Landing">
        <header id="Landing-Header">
          <form id="SearchForm">
            <label class="field a-field a-field_a2">
              <input
                class="field__input a-field__input"
                placeholder="Apple IPhone 11"
                required
              />
              <span class="a-field__label-wrap">
                <span class="a-field__label">Search</span>
              </span>
            </label>
          </form>
        </header>
        <section id="Home-RecentResults">
          <RecentResults />
        </section>
      </div>
    );
  }
}
