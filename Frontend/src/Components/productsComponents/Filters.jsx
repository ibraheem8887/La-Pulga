import React from 'react';

const Filters = ({setPriceFilter}) => {
    return (
        <div>
            <div className="grid p-5 border-r border-gray-200">
                <h2 className="p-3 font-serif text-2xl">Filters</h2>

                
               

                {/* Price Filter */}
<div className="mb-4">
  <h3 className="font-semibold mb-2">Price</h3>
  <ul className="space-y-1 text-sm">
    <li>
      <label>
        <input type="radio" name="price" onChange={() => setPriceFilter({ max: 50 })} className="mr-2" />
        Under $50
      </label>
    </li>
    <li>
      <label>
        <input type="radio" name="price" onChange={() => setPriceFilter({ min: 50, max: 100 })} className="mr-2" />
        $50 - $100
      </label>
    </li>
    <li>
      <label>
        <input type="radio" name="price" onChange={() => setPriceFilter({ min: 100, max: 200 })} className="mr-2" />
        $100 - $200
      </label>
    </li>
    <li>
      <label>
        <input type="radio" name="price" onChange={() => setPriceFilter({ min: 200 })} className="mr-2" />
        Above $200
      </label>
    </li>
  </ul>
</div>




            </div>

        </div>
    );
}

export default Filters;
