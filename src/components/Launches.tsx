/*
{
  launchesPast(limit: 10) {
    mission_name
    launch_date_local
    launch_site {
      site_name_long
    }
    links {
      article_link
      video_link
    }
    rocket {
      rocket_name
      first_stage {
        cores {
          flight
          core {
            reuse_count
            status
          }
        }
      }
      second_stage {
        payloads {
          payload_type
          payload_mass_kg
          payload_mass_lbs
        }
      }
    }
    ships {
      name
      home_port
      image
    }
  }
}
*/

import React from 'react';
import { useQuery, gql } from '@apollo/client';

export const Launches = (): JSX.Element => {
  const LAUNCHES = gql`
    query getLaunchesPutAnyNameHere {
      launchesPast(limit: 5) {
        mission_name
        launch_date_local
        launch_site {
          site_name_long
        }
      }
    }
  `;
  const { data, error, loading } = useQuery(LAUNCHES);

  return (
    <div>
      <h2>Launches :</h2>
      {loading && <h2 style={{ color: 'blue' }}>Loading...</h2>}
      {error && <h2 style={{ color: 'red' }}>Error...</h2>}
      {data && console.log(data)}
      {data &&
        data.launchesPast.map((launch: any) => {
          return (
            <h2 key={launch.mission_name}>
              Mission Name: {launch.mission_name} &nbsp; Launch Site:{' '}
              {launch.launch_site.site_name_long}
            </h2>
          );
        })}
    </div>
  );
};
