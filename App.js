import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const INITIAL_DETAILS = [
  { label: 'Name', value: 'Amajith Hansaja' },
  { label: 'Email', value: 'amajith2004@outlook.com', icon: 'mail' },
  { label: 'Points', value: '0', icon: 'star' },
];

function ProfileAvatar() {
  return (
    <View style={styles.avatar}>
      <View style={styles.avatarHair} />
      <View style={styles.face}>
        <View style={styles.glasses}>
          <View style={styles.glassLens} />
          <View style={styles.glassBridge} />
          <View style={styles.glassLens} />
        </View>
        <View style={styles.nose} />
        <View style={styles.smile} />
      </View>
      <View style={styles.shirt} />
      <View style={styles.checkBadge}>
        <Ionicons name="checkmark" size={19} color="#ffffff" />
      </View>
    </View>
  );
}

export default function App() {
  const [details, setDetails] = useState(INITIAL_DETAILS);
  const [modalVisible, setModalVisible] = useState(false);
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');

  function closeModal() {
    setModalVisible(false);
    setLabel('');
    setValue('');
  }

  function addDetail() {
    const cleanLabel = label.trim();
    const cleanValue = value.trim();
    if (!cleanLabel || !cleanValue) return;

    setDetails((currentDetails) => [
      ...currentDetails,
      { label: cleanLabel, value: cleanValue },
    ]);
    closeModal();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#050505" />
      <View style={styles.appShell}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.avatarWrap}>
            <ProfileAvatar />
          </View>
          <View style={styles.divider} />

          <View style={styles.detailsList}>
            {details.map((detail, index) => (
              <View style={styles.detailRow} key={`${detail.label}-${index}`}>
                <Text style={styles.detailLabel}>{detail.label}</Text>
                <View style={styles.valueLine}>
                  {detail.icon && (
                    <Ionicons
                      name={detail.icon}
                      size={16}
                      color="#111111"
                      style={styles.valueIcon}
                    />
                  )}
                  <Text style={styles.detailValue}>{detail.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        <Pressable
          accessibilityLabel="Add profile detail"
          accessibilityRole="button"
          onPress={() => setModalVisible(true)}
          style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
        >
          <Ionicons name="add" size={25} color="#ffffff" />
        </Pressable>
      </View>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalBackdrop}
        >
          <Pressable style={styles.backdropDismiss} onPress={closeModal} />
          <View style={styles.modalCard}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Add profile detail</Text>
            <Text style={styles.modalSubtitle}>Add another detail to your profile.</Text>
            <TextInput
              autoFocus
              placeholder="Label, e.g. Course"
              placeholderTextColor="#8c8c8c"
              value={label}
              onChangeText={setLabel}
              style={styles.input}
            />
            <TextInput
              placeholder="Value, e.g. BSc in Computing"
              placeholderTextColor="#8c8c8c"
              value={value}
              onChangeText={setValue}
              style={styles.input}
              onSubmitEditing={addDetail}
              returnKeyType="done"
            />
            <View style={styles.modalActions}>
              <Pressable onPress={closeModal} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable
                disabled={!label.trim() || !value.trim()}
                onPress={addDetail}
                style={({ pressed }) => [
                  styles.saveButton,
                  (!label.trim() || !value.trim()) && styles.disabledButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.saveText}>Save detail</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#050505',
  },
  appShell: {
    flex: 1,
    backgroundColor: '#f7f6f4',
  },
  header: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#050505',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 19,
    paddingBottom: 120,
  },
  avatarWrap: {
    alignItems: 'center',
    marginBottom: 18,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e6eb',
    overflow: 'hidden',
    position: 'relative',
  },
  avatarHair: {
    position: 'absolute',
    width: 44,
    height: 28,
    top: 14,
    left: 25,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#272727',
  },
  face: {
    position: 'absolute',
    width: 39,
    height: 45,
    top: 22,
    left: 28,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#333333',
    backgroundColor: '#f7e8df',
  },
  glasses: {
    position: 'absolute',
    top: 15,
    left: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  glassLens: {
    width: 14,
    height: 10,
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: '#232323',
  },
  glassBridge: {
    width: 5,
    height: 1,
    backgroundColor: '#232323',
  },
  nose: {
    position: 'absolute',
    width: 5,
    height: 5,
    top: 27,
    left: 17,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#555555',
  },
  smile: {
    position: 'absolute',
    width: 11,
    height: 5,
    top: 34,
    left: 13,
    borderBottomWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
  },
  shirt: {
    position: 'absolute',
    width: 61,
    height: 30,
    bottom: -4,
    left: 17,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#4a4a4a',
  },
  checkBadge: {
    position: 'absolute',
    right: 8,
    bottom: 17,
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: '#00d42a',
    transform: [{ rotate: '-8deg' }],
  },
  divider: {
    height: 1,
    backgroundColor: '#191919',
    marginBottom: 12,
  },
  detailsList: {
    gap: 18,
  },
  detailRow: {
    minHeight: 34,
  },
  detailLabel: {
    color: '#111111',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 5,
  },
  valueLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueIcon: {
    marginRight: 7,
  },
  detailValue: {
    color: '#333333',
    fontSize: 14,
  },
  addButton: {
    position: 'absolute',
    right: 18,
    bottom: 18,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: '#050505',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  pressed: {
    opacity: 0.72,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.42)',
  },
  backdropDismiss: {
    flex: 1,
  },
  modalCard: {
    padding: 22,
    paddingBottom: Platform.OS === 'ios' ? 34 : 22,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    backgroundColor: '#ffffff',
  },
  modalHandle: {
    alignSelf: 'center',
    width: 42,
    height: 4,
    marginBottom: 17,
    borderRadius: 2,
    backgroundColor: '#d8d8d8',
  },
  modalTitle: {
    color: '#101010',
    fontSize: 20,
    fontWeight: '800',
  },
  modalSubtitle: {
    color: '#707070',
    fontSize: 13,
    marginTop: 5,
    marginBottom: 18,
  },
  input: {
    height: 48,
    paddingHorizontal: 14,
    marginBottom: 11,
    borderWidth: 1,
    borderColor: '#d6d6d6',
    borderRadius: 8,
    color: '#111111',
    fontSize: 14,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  cancelButton: {
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  cancelText: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '700',
  },
  saveButton: {
    paddingHorizontal: 17,
    paddingVertical: 11,
    borderRadius: 7,
    backgroundColor: '#050505',
  },
  disabledButton: {
    backgroundColor: '#bdbdbd',
  },
  saveText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
});
