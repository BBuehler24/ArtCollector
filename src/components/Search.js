import React, { useEffect, useState } from 'react';

/**
 * Don't touch these imports!
 */
import { 
  fetchAllCenturies,
  fetchAllClassifications,
  fetchQueryResults
} from '../api';

const Search = ({ setIsLoading, setSearchResults }) => {
  const [centuryList, setCenturyList] = useState([]);
  const [classificationList, setClassificationList] = useState([]);
  const [queryString, setQueryString] = useState('');
  const [century, setCentury] = useState('any');
  const [classification, setClassification] = useState('any');


  useEffect(() => {
    const getResults = async () => {
      try {
        const classificationsResponse = await fetchAllClassifications();
        const centuriesResponse = await fetchAllCenturies();
        setClassificationList(classificationsResponse);
        setCenturyList(centuriesResponse);
      } catch (error) {
        console.error(error);
      }
    }
    getResults();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const queryResultsResponse = await fetchQueryResults({
        century,
        classification,
        queryString,
      });
      setSearchResults(queryResultsResponse);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return <form id="search" onSubmit={handleSubmit}>
    <fieldset>
      <label htmlFor="keywords">Query</label>
      <input 
        id="keywords" 
        type="text" 
        placeholder="enter keywords..." 
        value={queryString} 
        onChange={(e) => setQueryString(e.target.value)}/>
    </fieldset>
    <fieldset>
      <label htmlFor="select-classification">Classification <span className="classification-count">({ classificationList.length })</span></label>
      <select 
        name="classification"
        id="select-classification"
        value={classification} 
        onChange={(e) => setClassification(e.target.value)}>
        <option value="any">Any</option>
        {classificationList.map((item) => {
          return (
            <option value={item.name} key={item.id}> {item.name} </option>
          )
        })}
      </select>
    </fieldset>
    <fieldset>
      <label htmlFor="select-century">Century <span className="century-count">({ centuryList.length })</span></label>
      <select 
        name="century" 
        id="select-century"
        value={century} 
        onChange={(e) => setCentury(e.target.value)}>
        <option value="any">Any</option>
        {centuryList.map((item) => {
          return (
            <option value={item.name} key={item.id}> {item.name} </option>
          )
        })}
      </select>
     </fieldset>
    <button>SEARCH</button>
  </form>
}

export default Search;