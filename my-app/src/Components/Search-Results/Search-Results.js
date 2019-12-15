import React from "react";
import "../../Styles/Search-Results.css";

export default class SearchResults extends React.Component {
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
      </div>
    );
  }
}
