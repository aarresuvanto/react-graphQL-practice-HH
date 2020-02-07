import React from 'react'
import './App.css'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost'

const Countries = ({ GET_COUNTRIES }) => {
  const { loading, error, data } = useQuery(GET_COUNTRIES)

  if(loading) return <h3>Loading...</h3>
  if(error) return `Error ${error.message}`

  const countries = data.countries.map((country, index) => {
    return (
      <tr key={index}>
        <td>{country.code}</td>
        <td>{country.name}</td>
        <td>{country.continent.name}</td>
      </tr>
    )
  })

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Code</th>
            <th>Country</th>
            <th>Continent</th>
          </tr>
          {countries}
        </tbody>
      </table>
    </div>
  )
}

function App() {
  const client = new ApolloClient ({
    uri:'https://countries.trevorblades.com/',
  })

  const GET_COUNTRIES = gql`
    {
      countries {
        code,
        name,
        continent {
          name,
        }
      }
    }
  `

  return (
   <ApolloProvider client={client}>
     <div>
       <Countries GET_COUNTRIES={GET_COUNTRIES}/>
     </div>
   </ApolloProvider>
  )
}

export default App;
