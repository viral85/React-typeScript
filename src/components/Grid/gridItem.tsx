import React from 'react';
import veg from "../../assets/images/veg.jpg";
import nonVeg from "../../assets/images/non-veg.jpeg";

interface GridItemProps {
  itemDetails : any;
  gridItemClick : Function;
}

const GridItem = (props: GridItemProps) => {
    const { itemDetails, gridItemClick } = props;

    const testImages = [
       {type: 'Gujrati Food',img:'https://www.culturalindia.net/iliimages/Gujarati-Food-1.jpg', dietaryPreference : veg},
       {type: 'South Indian Food',img:'https://www.franchiseindia.com/uploads/content/ri/art/south-indian-cuisine-building-a--3ca18496e8.jpg', dietaryPreference : nonVeg},
       {type: 'Kashmiri Food',img:'https://www.culturalindia.net/iliimages/Kashmiri-Food-1.jpg', dietaryPreference : nonVeg},
       {type: 'Rajasthani Food',img:'https://www.culturalindia.net/iliimages/Rajasthani-Food-1.jpg', dietaryPreference : veg},
       ]

    return (
         <React.Fragment>
           <div className='col-sm-3'>
                    <div className='card' key={itemDetails.id} onClick={() => {gridItemClick(itemDetails)}}>
                      <img
                        className='card-img-top'
                        src={testImages[itemDetails.id % 3].img}
                        alt='Card image cap'
                      />
                      <div className='card-body'>
                        <h5 className='card-title'>{itemDetails.name} 
                        <span > <img src={testImages[itemDetails.id % 3].dietaryPreference} alt='cart' /></span>
                        </h5>
                        <p className='card-text'>{testImages[itemDetails.id % 3].type}</p>
                        <p className='card-text'>
                          <small className='text-muted'>
                            Quick View
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
         </React.Fragment>
    );
}

export default GridItem;