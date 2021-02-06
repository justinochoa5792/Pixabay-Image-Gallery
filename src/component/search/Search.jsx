import React, { useState } from "react";
import Axios from "axios";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import ImageResults from "../image-results/ImageResults";

const Search = () => {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState([]);
  const [amount, setAmount] = useState(15);

  const onTextChange = (e) => {
    setSearch(([e.target.name] = e.target.value));
    renderPhoto();
  };

  const renderPhoto = () => {
    Axios.get(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_API}&q=${search}&image_type=photo&per_page=${amount}&safesearch=true`
    ).then((response) => {
      setImages(response.data.hits);
      console.log(response.data.hits);
    });
  };

  const onAmountChange = (e, index, value) => {
    setAmount(value);
  };

  return (
    <div>
      <TextField
        name="searchText"
        value={search}
        onChange={onTextChange}
        floatingLabelText="Search For Images"
        fullWidth={true}
      />
      <br />
      <SelectField
        name="amount"
        floatingLabelText="Amount"
        value={amount}
        onChange={onAmountChange}
      >
        <MenuItem value={5} primaryText="5" />
        <MenuItem value={10} primaryText="10" />
        <MenuItem value={15} primaryText="15" />
        <MenuItem value={30} primaryText="30" />
        <MenuItem value={50} primaryText="50" />
      </SelectField>
      <br />
      {images.length > 0 ? <ImageResults images={images} /> : null}
    </div>
  );
};

export default Search;
