export const UserForm = () => {
  return (
      <div>
        <h1>UserForm</h1>
        <form>
          <label htmlFor="username">Name</label>
          <input id="name" type="text"/>
          <label htmlFor="birthDate">Birth Date</label>
          <input id="birthDate" type="date"/>
          <label htmlFor="sex">Sex</label>
          <select id="sex">
            <option>&#x2640;</option>
            <option>&#x2642;</option>
            <option>&#x26A5;  &#x25B3;</option>
          </select>
          <label htmlFor="weight">Weight</label>
          <input id="weight" type="number"/>
          <label htmlFor="height">Height on cm</label>
          <input id="height" type="number"/>
          <label htmlFor="eyesColor">Eyes Color</label>
          <select id="eyesColor">
            <option>Blue</option>
            <option>Brown</option>
            <option>Green</option>
            <option>Hazel</option>
            <option>Amber</option>
            <option>Gray</option>
            <option>Red and violet</option>
            <option>Two different colors</option>
          </select>
          <label htmlFor="hairColor">Hair Color</label>
          <select id="hairColor">
            <option>Blond</option>
            <option>Dark blond</option>
            <option>Medium brown</option>
            <option>Dark brown</option>
            <option>Black</option>
            <option>Reddish-brow</option>
            <option>Red</option>
            <option>Gray</option>
            <option>White</option>
            <option>I don't really remember</option>
            <option>Bold</option>
          </select>
          <label htmlFor="hobby">Hobby</label>
          <input id="hobby" type="text"/>
          <button>Submit</button>
        </form>
      </div>
  );
};