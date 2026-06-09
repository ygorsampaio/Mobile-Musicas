import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../services/api';

export default function ListaScreen({ navigation }) {
  const [musicas, setMusicas] = useState([]);

  useFocusEffect(
    useCallback(() => {
      carregarMusicas();
    }, [])
  );

  async function carregarMusicas() {
    try {
      const resposta = await api.get('/musicas');
      setMusicas(resposta.data);
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível carregar as músicas');
    }
  }

  async function deletarMusica(id) {
    Alert.alert('Confirmar', 'Deseja deletar esta música?', [
      { text: 'Cancelar' },
      {
        text: 'Deletar',
        onPress: async () => {
          try {
            await api.delete(`/musicas/${id}`);
            carregarMusicas();
          } catch (erro) {
            Alert.alert('Erro', 'Não foi possível deletar');
          }
        },
      },
    ]);
  }

  function renderItem({ item }) {
    return (
      <View style={styles.card}>
        <View style={styles.cardInfo}>
          <Text style={styles.titulo}>{item.titulo}</Text>
          <Text style={styles.artista}>{item.artista}</Text>
          <Text style={styles.genero}>{item.genero} · {'⭐'.repeat(item.nota)}</Text>
        </View>
        <View style={styles.cardBotoes}>
          <TouchableOpacity
            style={styles.botaoEditar}
            onPress={() => navigation.navigate('Formulario', { musica: item })}
          >
            <Text style={styles.botaoTexto}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botaoDeletar}
            onPress={() => deletarMusica(item.id)}
          >
            <Text style={styles.botaoTexto}>Deletar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={musicas}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhuma música cadastrada ainda</Text>
        }
      />
      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => navigation.navigate('Formulario', { musica: null })}
      >
        <Text style={styles.botaoAdicionarTexto}>+ Adicionar música</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  artista: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  genero: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
  },
  cardBotoes: {
    gap: 8,
  },
  botaoEditar: {
    backgroundColor: '#4A90D9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 6,
  },
  botaoDeletar: {
    backgroundColor: '#E74C3C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
  },
  vazio: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 40,
    fontSize: 15,
  },
  botaoAdicionar: {
    backgroundColor: '#2ECC71',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  botaoAdicionarTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
