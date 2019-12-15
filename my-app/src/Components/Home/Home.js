import React from "react";
import "../../Styles/Home.css";
import RecentResults from "../Recent-Results/Recent-Results";

export default class Home extends React.Component {
  render() {
    return (
      <div class="Home">
        <section id="Home-Header">
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
        </section>
        <section id="Home-RecentResults">
          <RecentResults />
        </section>
      </div>
    );
  }
}
