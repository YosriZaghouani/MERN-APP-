import React from 'react';

const Search = () => {
  return (
    <>
      <form className="navbar-search col-xl-5 center mt-3 mb-3">
        <div className="mb-0 form-group">
          <div className="input-group-alternative input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fas fa-search" />
              </span>
            </div>
            <input placeholder="Search" type="text" className="form-control" />
          </div>
        </div>
      </form>
    </>
  );
};

export default Search;
