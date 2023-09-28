import React from 'react';
import './styles.css';

/**
 * Images
 */
import IMAGE_CMB from '../../../../assets/images/CMB.jpg';
import IMAGE_CMBEL from '../../../../assets/images/CMBEL.jpg';
import IMAGE_CMBH from '../../../../assets/images/CMBH.jpg';
import IMAGE_CMC from '../../../../assets/images/CMC.jpg';
import IMAGE_CMCG from '../../../../assets/images/CMCG.jpg';
import IMAGE_CMF from '../../../../assets/images/CMF.jpg';
import IMAGE_CMM from '../../../../assets/images/CMM.jpg';
import IMAGE_CMPA from '../../../../assets/images/CMPA.jpg';
import IMAGE_CMR from '../../../../assets/images/CMR.jpg';
import IMAGE_CMRJ from '../../../../assets/images/CMRJ.jpg';
import IMAGE_CMSM from '../../../../assets/images/CMSM.jpg';
import IMAGE_CMSP from '../../../../assets/images/CMSP.jpg';
import IMAGE_CMVM from '../../../../assets/images/CMVM.jpg';


function FisrtPlaced() {

  const arrayColleges = ["CMB", "CMBEL", "CMBH", "CMC", "CMCG", "CMF", "CMM", "CMPA", "CMR", "CMRJ", "CMSM", "CMSP", "CMVM"];

  const images_colleges = {
    CMB: {
      name: 'CMB',
      image: IMAGE_CMB,
      position: 1
    },
    CMBEL: {
      name: 'CMBEL',
      image: IMAGE_CMBEL,
      position: 2
    },
    CMBH: {
      name: 'CMBH',
      image: IMAGE_CMBH,
      position: 3
    },
    CMC: {
      name: 'CMC',
      image: IMAGE_CMC,
      position: 4
    },
    CMCG: {
      name: 'CMCG',
      image: IMAGE_CMCG,
      position: 5
    },
    CMF: {
      name: 'CMF',
      image: IMAGE_CMF,
      position: 6
    },
    CMM: {
      name: 'CMM',
      image: IMAGE_CMM,
      position: 7
    },
    CMPA: {
      name: 'CMPA',
      image: IMAGE_CMPA,
      position: 8
    },
    CMR: {
      name: 'CMR',
      image: IMAGE_CMR,
      position: 9
    },
    CMRJ: {
      name: 'CMRJ',
      image: IMAGE_CMRJ,
      position: 10
    },
    CMSM: {
      name: 'CMSM',
      image: IMAGE_CMSM,
      position: 11
    },
    CMSP: {
      name: 'CMSP',
      image: IMAGE_CMSP,
      position: 12
    },
    CMVM: {
      name: 'CMVM',
      image: IMAGE_CMVM,
      position: 13
    }
  }

  return (
    < div className='first-placed-row' >
      {arrayColleges.map((college, index) => (
        <div key={index} className='first-placed-college'>
          <div className='first-placed-college-position'>
            <p>{images_colleges[college].position}º</p>
          </div>
          <div className='first-placed-college-image'>
            <img src={images_colleges[college].image} alt={images_colleges[college].name} />
          </div>
        </div>
      ))}
    </div >
  );
}

export default FisrtPlaced;