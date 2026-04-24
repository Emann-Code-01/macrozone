import { updateMeal, Meal } from '@/storage/meals';
import { colors, globalStyles } from '@/styles/global';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  Alert, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';

export default function EditMealScreen() {
  const { meal: mealParam } = useLocalSearchParams<{ meal: string }>();
  const existing: Meal = JSON.parse(mealParam);

  const [name, setName] = useState(existing.name);
  const [calories, setCalories] = useState(existing.calories.toString());
  const [protein, setProtein] = useState(existing.protein.toString());
  const [carbs, setCarbs] = useState(existing.carbs.toString());
  const [fat, setFat] = useState(existing.fat.toString());

  const handleUpdate = async () => {
    if (!name || !calories) {
      Alert.alert('Error', 'Please enter a meal name and calories.');
      return;
    }

    await updateMeal({
      ...existing,
      name,
      calories: Number(calories),
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
    });
    router.back();
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Edit Meal</Text>

      <TextInput
        style={styles.input}
        placeholder="Meal name"
        placeholderTextColor={colors.textSecondary}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Calories"
        placeholderTextColor={colors.textSecondary}
        keyboardType="numeric"
        value={calories}
        onChangeText={setCalories}
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder="Protein (g)"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={protein}
          onChangeText={setProtein}
        />
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder="Carbs (g)"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={carbs}
          onChangeText={setCarbs}
        />
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder="Fat (g)"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={fat}
          onChangeText={setFat}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Meal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    marginTop: 16,
  },
  row: { flexDirection: 'row', gap: 10 },
  rowInput: { flex: 1 },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: { color: colors.background, fontSize: 16, fontWeight: 'bold' },
});