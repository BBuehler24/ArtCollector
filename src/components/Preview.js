import React from 'react';

/**
 * We need to import fetchQueryResultsFromURL since we will sometimes have urls in info.prev and info.next
 * which are query urls.
 */
import { fetchQueryResultsFromURL } from '../api';

const Preview = (props) => {
  const {
    setIsLoading,
    searchResults: { info, records },
    setSearchResults,
    setFeaturedResult,
  } = props;
  /**
   * Destructure setSearchResults, setFeaturedResult, and setIsLoading from props
   * and also destructure info and records from props.searchResults
   * 
   * You need info, records, setSearchResults, setFeaturedResult, and setIsLoading as available constants
   */


  /**
   * Don't touch this function, it's good to go.
   * 
   * It has to be defined inside the Preview component to have access to setIsLoading, setSearchResults, etc...
   */
  async function fetchPage(pageUrl) {
    setIsLoading(true);

    try {
      const results = await fetchQueryResultsFromURL(pageUrl);
      console.log(results);
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return <aside id="preview">
    <header className="pagination">
      <button 
        disabled={!info.prev} 
        className="previous"
        onClick={(() => {
          fetchPage(info.prev)
        })}>Previous</button>
      <button
        disabled={!info.next}
        className="next"
        onClick={(() => {
          fetchPage(info.next)
        })}>Next</button>
    </header>
    <section className="results">
      {

        records.map((record, idx) => {
          // console.log(records);
          return (
            <div
              key={ idx }
              className="object-preview"
              onClick={(e) => {
                e.preventDefault();
                setFeaturedResult(record);
              }}>
                {
                  record.primaryimageurl ? <img src={ record.primaryimageurl } alt={ record.description } /> : null
                }
                {
                  record.title ? <h3>{ record.title }</h3> : <h3>MISSING INFO</h3>
                }
              </div>
          )
        })
      }
    </section>
  </aside>
}

export default Preview;