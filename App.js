import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image, ScrollView } from 'react-native';
import axios from 'axios';

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const apiUrl = 'https://randomuser.me/api/?results=10';

    axios.get(apiUrl)
      .then(response => {
        setData(response.data.results);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Lista de Usuarios Aleatorios</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Image style={styles.userImage} source={{ uri: item.picture.large }} />
            <Text style={styles.userName}>
              {item.name.first} {item.name.last}
            </Text>
            <Text style={styles.userEmail}>{item.email}</Text>
            <Text style={styles.userLocation}>
              {item.location.city}, {item.location.state}, {item.location.country}
            </Text>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  userEmail: {
    fontSize: 16,
    color: 'gray',
  },
  userLocation: {
    fontSize: 14,
    color: 'gray',
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 8,
  },
});
