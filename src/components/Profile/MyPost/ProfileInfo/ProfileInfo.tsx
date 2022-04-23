import React from 'react';
import classes from './ProfileInfo.module.css';



const ProfileInfo = () => {
  return (
    <div>
      <div >
        <img src='https://tourweek.ru/file/image?path=uploads/sight/18_t54rAgvvhaQFjUQ5NgTbyOHOpn63n.png&w=940&h=430&fit=crop&s=2a24e865c38975022109fd67b873629c' />
      </div>
      <div className={classes.descriptionBlock}>
        ava + description
      </div>
    </div>
  );

}

export default ProfileInfo;