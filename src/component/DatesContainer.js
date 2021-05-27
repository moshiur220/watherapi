import React from 'react';
import { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { formatDate, formatTime } from '../dateformate'; 

import ForecastItem from './ForecastItem';

export default class DatesContainer extends React.Component {
	render() {
		const {city, country, results} = this.props;

		return (
			<Fragment>
				<h2>{city}, {country}</h2>

				{
					results.map((result, i) => {
						return (
							<div className="date" key={i}>
								<h3>{formatDate(result.name)}</h3>
								
								{/* split the forecasts into 2 rows*/}
                                

                        
								<ul> 
                                    <Grid container spacing={3}>
                                    
									{
										result.weathers.slice(0,4) // the first 4
											.map((weatherItem, i) => 
                                            <Grid item xs={3}>
                                                <Card className="show-content">
												<ForecastItem key={i}
													date={formatTime(weatherItem.dt_txt.split(' ')[1])}
													icon={weatherItem.weather[0].icon}
													main={weatherItem.weather[0].main}
													description={weatherItem.weather[0].description}
													max={Math.round(weatherItem.main.temp_max)}
													min={Math.round(weatherItem.main.temp_min)} />
                                                    </Card>
                                                    </Grid>
                                                    )
                                                  
									}
                                      
                                    </Grid>
								</ul>

								<ul>
                                <Grid container spacing={3}>
                                   
									{
										result.weathers.slice(4) // the remaining
											.map((weatherItem, i) =>
                                            <Grid item xs={3}>
                                                <Card className="show-content">
												<ForecastItem key={i}
													date={formatTime(weatherItem.dt_txt.split(' ')[1])}
													icon={weatherItem.weather[0].icon}
													main={weatherItem.weather[0].main}
													description={weatherItem.weather[0].description}
													max={Math.round(weatherItem.main.temp_max)}
													min={Math.round(weatherItem.main.temp_min)} />
                                                    </Card>
                                                      </Grid>
                                                    )
									}
                                    
                                    </Grid>
								</ul>
							</div>	
						)
					})
				}
			</Fragment>
		);
	}
}