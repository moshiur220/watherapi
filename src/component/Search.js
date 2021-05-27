import React from 'react';
import { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Results from './Results';
import Button from './Sbutton';

export default class Search extends React.Component {
	constructor() {
		super();

		this.state = {
			showSearch: true,
			enableBtn: false,
			showWhat: "",
			name: "",
			country: "",
			list: [],
			categorizedList: [],
		}

		this.inputSearch = React.createRef(); // create reference to the <input> field
	}

	validateInput = () => {
		// console.log(this.inputSearch.current.value);
		const value = this.inputSearch.current.value.trim();

		value ? this.setState({enableBtn: true}) : this.setState({enableBtn: false}); // enable button if input field is not empty
	}

	search = () => {
		// console.log('searched', this.inputSearch.current.value);
		const city = this.inputSearch.current.value.trim();
		const key="9f0c4d97cdc37a790916c647f1a577e6";
		fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${key}`, 
			{ method: 'GET'})
			.then(response => response.json())
			.then(json => {
				// console.log('json', json);

				// show results only if response is 200 (actual results returned from api)
				if(json.cod === "200") {
					const city = json.city;

					this.setState(prevState => {
						return {
							showSearch: false,
							showWhat: "results",
							city: city.name,
							country: city.country,
							list: json.list,
							categorizedList: this.categorizeResults(json.list)
						}
					});
				}

				// if not found
				if(json.cod === "404") {
					this.setState({
						showSearch: false,
						showWhat: "notFound"
					});
				}

				return false;
			})
			.catch(error => {
				console.log('error', error);
			});
	}

	categorizeResults = (list) => {
		// get an array of all the dates
		// use values of that array to filter out the results

		// console.log('list', this.state.list);

		const dates = list
			.map((item, i) => {
				return item.dt_txt.split(" ")[0];
			})
			.filter((item, i, currArr) => {
				return currArr.indexOf(item) === i;
			});

		// console.log('dates', dates);

		// create a new object with those dates as keys
		let sortedResults = [];
		for(let theDate of dates) {
			sortedResults.push({
				name: theDate,
				weathers: []
			});
		}

		// for each item in the json.list
		for(let item of list) {
			let itemDate = item.dt_txt.split(" ")[0]; // get the date in string form

			//if sortedResults.name = itemDate then push that item into that sortedResult's weathers array
			for(let result of sortedResults) {
				if(result.name === itemDate) {
					result.weathers.push(item);
				}
			}
		}

		// console.log('sortedResults', sortedResults);
		return sortedResults;
	}

	handleClear = () => {
		this.setState({
			showSearch: true,
			enableBtn: false,
			showWhat: ""
		});
	}

	render() {
		// console.log('state', this.state);

		return (
			<Fragment>

          
				{
					(this.state.showSearch)	?
                    <Grid container spacing={3} className="cmPosition">
                    <Grid item xs={8}>
							<TextField id="standard-basic" fullWidth label="Search by city" inputRef={this.inputSearch} onKeyUp={this.validateInput}/>		

						      </Grid>
						      <Grid item xs={4} className="btnPosition">

                              <Button 
								isDisabled={!this.state.enableBtn}
								clickHandler={this.search}
								btnCopy="Get Forecast" />
						      </Grid>
                              </Grid>
						: ""
				}

				{
					(this.state.showWhat) ? 
						<Results 
							showWhat={this.state.showWhat}
							city={this.state.city}
							country={this.state.country}
							results={this.state.categorizedList}
							handleClear={this.handleClear} />
						: ""		
				}
  
			</Fragment>
		);
	}
}