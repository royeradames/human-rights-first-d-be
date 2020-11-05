//import libraries
const axios = require('axios');
const router = require('express').Router();

router.post('us_demo_pie', async () => {
  try {
    //validate inputs
    //set default values
    
    //
  } catch (error) {
    next(error)
  }
})

router.post('/us_map', async (req, res, next) => {
  try {
    // set default values to the post input if none are provided
    const is_no_start_date = !req.body.start_date
    const is_no_end_date = !req.body.end_date
    const is_no_sort_by = !req.body.sort_by
    if(is_no_start_date) req.body.start_date = "2013-01-01";
    if(is_no_end_date) req.body.end_date = "2019-01-01";
    if(is_no_sort_by) req.body.sort_by = "Demographic";

    //get data from ds_server
    let a_state_unemployment_rate = await axios.post(
      `http://hrf-ds16.eba-fmbjvhg4.us-east-1.elasticbeanstalk.com/us_map`,
      {
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        sort_by: req.body.sort_by,
      }
    );

    //return send ds_server data
    res.status(200).json({
      unemployment_rate: a_state_unemployment_rate.data,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/us_bar', async (req, res, next) => {
  try {
    /* 
    Backend will handle the input validation
    state have to be 2 letter and capitalize = GA FL CA
    cities => no spaces like Atlanta,GA
    //when you see first letter capitalize on DS doc that means that is how they want it
    */
    //validate incoming inputs
    //states inputs
    // Todo: check that states var changes req...states
    // const states = req.body.group_by.States
    // const is_group_by_states = states 
    // if(is_group_by_states){
    //   states.forEach(state => {
        
    //     if (state.length === 2 ) {
          
    //       //change all given states abbreviation to uppercase
    //       state.toUpperCase()
    //     }
    //     else{
    //       //if the state input is not 2 characters ask user to change it to 2
    //       res.status(404).json({error: "state abbreviation must be 2 letters"})
    //     }
        
    //   })
    // }

    
    //zipcodes
    //no need, it will just not return data if put incorrect zipcode

    //city no spaces like Atlanta,GA
    // no spaces anywhere
    // first letter capitalize
    // state must be in upper case, and 2 chars

    //set defaul values
    const is_no_start_date = !req.body.start_date
    const is_no_end_date = !req.body.end_date
    const is_no_group_by = !req.body.group_by
    const is_no_asc = !req.body.asc

    if (is_no_start_date) req.body.start_date = "2013-01-01"
    if (is_no_end_date) req.body.end_date = "2019-01-01"
    if (is_no_group_by) req.body.group_by = {National: true}
    if (is_no_asc) req.body.asc = true

    
    // get data from DS server
    const us_bar = await axios.post(`http://hrf-ds16.eba-fmbjvhg4.us-east-1.elasticbeanstalk.com/us_bar`, {
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        group_by: req.body.group_by,
        asc: req.body.asc
      })

    // send DS data to cliet  
    res.status(200).json({ us_bar: us_bar.data })
  } catch (error) {
    next(error)
  }
})
module.exports = router;
