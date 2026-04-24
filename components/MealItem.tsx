import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { deleteMeal } from '@/storage/meals';
import { colors } from '@/styles/global';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

type MealItemProps = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  onDelete: () => void;
  onEdit: () => void;
};

export default function MealItem({
  id,
  name,
  calories,
  protein,
  carbs,
  fat,
  onDelete,
  onEdit,
}: MealItemProps) {
  const handleLongPress = () => {
    Alert.alert('Delete Meal', `Are you sure you want to delete "${name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteMeal(id);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          onDelete();
        },
      },
    ]);
  };

  return (
    <TouchableOpacity style={styles.container} onLongPress={handleLongPress}>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.macros}>
          {calories} cal • {protein}g P • {carbs}g C • {fat}g F
        </Text>
      </View>
      <View style={styles.edit}>
        <Ionicons name="pencil" size={24} color={colors.textSecondary} onPress={onEdit} />
        <Ionicons name="trash" size={24} color={colors.alert} onPress={handleLongPress} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  edit: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  macros: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
});