import { useState} from 'react';
import { GlobalStyles } from './GlobalStyles';
import 'modern-normalize';

import { StyledApp } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const handleSubmit = ({ query }, { resetForm }) => {
    setQuery(query);
    setPage(1);
    resetForm();
  };

  const handleClick = () => {
    setPage(prevState => prevState + 1);
  };

    return (
      <StyledApp>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery
          query={query}
          page={page}
          handleCilck={handleClick}
        />
        <GlobalStyles />
      </StyledApp>
    );
  }


  
export default App;