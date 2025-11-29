import React, { useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale, moderateScale, screenWidth } from '../../src/responsive';

const COLORS = {
  background: '#141326',
  cardBg: '#433DA3',
  primary: '#E3823C',
  accent: '#E33C3C',
  text: '#FFFFFF',
  textSecondary: '#D7C7EC',
  yellow: '#FFC107',
};

const Home = () => {
  const [budgetData, setBudgetData] = useState(null); // Stores the user's budget information
  const [loading, setLoading] = useState(true); // Shows if we're still loading data
  const [alertVisible, setAlertVisible] = useState(false); // Controls if the alert popup is shown
  const [username, setUsername] = useState('Jo'); // Stores the user's name
  const carouselRef = useRef(null); // Reference to the carousel for scrolling

  // This runs every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadBudgetData();
      loadUserData();
    }, [])
  );

  // Function to load budget data from storage
  const loadBudgetData = async () => {
    try {
      // Get the saved budget data
      const savedData = await AsyncStorage.getItem('userBudget');

      // If we found data, convert it from text to an object
      if (savedData != null) {
        const budgetObject = JSON.parse(savedData);
        setBudgetData(budgetObject);
      }
    } catch (error) {
      console.error('Failed to load budget data', error);
    } finally {
      // Always stop loading, whether we succeeded or failed
      setLoading(false);
    }
  };

  // Function to load user information from storage
  const loadUserData = async () => {
    try {
      // Get the saved user data
      const savedUserData = await AsyncStorage.getItem('userData');

      // If we found data, extract the username
      if (savedUserData != null) {
        const userObject = JSON.parse(savedUserData);
        const displayName = userObject.name || userObject.username || 'Jo';
        setUsername(displayName);
      }
    } catch (error) {
      console.error('Failed to load user data', error);
    }
  };

  // Function to scroll the carousel to a specific slide
  const scrollToSlide = (slideNumber) => {
    if (carouselRef.current) {
      const slideWidth = screenWidth - scale(40);
      const scrollPosition = slideNumber * slideWidth;
      carouselRef.current.scrollTo({ x: scrollPosition, animated: true });
    }
  };

  // Show loading spinner while data is being loaded
  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  // Show message if no budget data exists
  if (!budgetData) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.text}>No budget data found.</Text>
        <Text style={styles.subtext}>Please complete the onboarding first.</Text>
      </View>
    );
  }

  // === CALCULATE DATA FOR CHARTS ===

  // 1. Calculate Savings Amount
  const monthlyIncome = budgetData.monthlyIncome || 0;
  const savingsRate = budgetData.targetSavingsRate || 0;
  const savingsAmount = (monthlyIncome * savingsRate) / 100;

  // 2. Calculate Remaining Budget for Categories
  const remainingBudget = monthlyIncome - savingsAmount;

  // 3. Prepare Chart Data
  // We'll split the remaining budget equally among selected categories for now
  // as a "Suggested Allocation"
  const categories = budgetData.spendingCategories || [];
  const amountPerCategory = categories.length > 0 ? remainingBudget / categories.length : 0;

  const categoryNames = categories;
  const categoryAmounts = categories.map(() => amountPerCategory);

  // 4. Emergency Fund Data
  const emergencyGoal = budgetData.emergencyFundGoal || 0;
  const currentEmergencySavings = 0; // Start at 0 for new users

  // 5. Prepare Spending Trend Data (Top Category per Month)
  // wa pa tay real data so sample rani

  // Use all categories for the Y-axis mapping
  const trendCategories = categories.length > 0 ? categories : ['None'];

  // Generate dummy "Top Category Index" for 6 months
  // This picks a random category index for each month
  const trendDataPoints = [
    Math.floor(Math.random() * trendCategories.length),
    Math.floor(Math.random() * trendCategories.length),
    Math.floor(Math.random() * trendCategories.length),
    Math.floor(Math.random() * trendCategories.length),
    Math.floor(Math.random() * trendCategories.length),
    Math.floor(Math.random() * trendCategories.length),
  ];

  // Configuration for the charts
  const chartConfig = {
    backgroundColor: COLORS.cardBg,
    backgroundGradientFrom: COLORS.cardBg,
    backgroundGradientTo: COLORS.cardBg,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(215, 199, 236, ${opacity})`,
    style: { borderRadius: moderateScale(16) },
    barPercentage: 0.7,
    propsForLabels: { fontSize: moderateScale(10), fontFamily: 'Poppins-Regular' },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: COLORS.yellow
    }
  };

  // === RENDER THE SCREEN ===
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar style="light" backgroundColor={COLORS.background} translucent={false} />

      {/* Alert Modal - Shows budget warnings */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={alertVisible}
        onRequestClose={() => setAlertVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Budget Alert!</Text>
            <Text style={styles.modalText}>
              You're approaching your entertainment budget limit. Consider reducing spending in this category.
            </Text>
            <TouchableOpacity onPress={() => setAlertVisible(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Header Section - Shows greeting and notification bell */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hi, {username}!</Text>
            <Text style={styles.subtext}>How are you today?</Text>
          </View>
          <TouchableOpacity onPress={() => setAlertVisible(true)}>
            <MaterialIcons name="notifications-none" size={moderateScale(28)} color={COLORS.accent} />
          </TouchableOpacity>
        </View>

        {/* Carousel Section - Swipeable cards showing different stats */}
        <View style={styles.carouselContainer}>
          <ScrollView
            ref={carouselRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {/* Card 1: Monthly Income */}
            <View style={styles.carouselCard}>
              <Text style={styles.cardTitle}>Monthly Income</Text>
              <Text style={styles.amount} adjustsFontSizeToFit numberOfLines={1}>
                ₱ {monthlyIncome.toLocaleString()}
              </Text>
              <View style={styles.row}>
                <Text style={styles.change}>Ready to budget</Text>
                <TouchableOpacity style={styles.actionButton} onPress={() => scrollToSlide(1)}>
                  <Text style={styles.actionButtonText}>See Emergency Fund</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Card 2: Emergency Fund */}
            <View style={styles.carouselCard}>
              <Text style={styles.cardTitle}>Emergency Fund</Text>
              <Text style={styles.amount} adjustsFontSizeToFit numberOfLines={1}>
                ₱ {currentEmergencySavings.toLocaleString()}
              </Text>
              <Text style={styles.subtext}>
                Goal: ₱ {emergencyGoal.toLocaleString()}
              </Text>
              <View style={styles.row}>
                <View />
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: COLORS.primary }]}
                  onPress={() => scrollToSlide(2)}
                >
                  <Text style={styles.actionButtonText}>See Savings Rate</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Card 3: Savings Rate */}
            <View style={styles.carouselCard}>
              <Text style={styles.cardTitle}>Savings Rate</Text>
              <Text style={styles.amount} adjustsFontSizeToFit numberOfLines={1}>
                {savingsRate}%
              </Text>
              <Text style={styles.subtext}>of Monthly Income</Text>
              <View style={styles.row}>
                <View />
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: COLORS.primary }]}
                  onPress={() => scrollToSlide(0)}
                >
                  <Text style={styles.actionButtonText}>Back to Monthly Income</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Budget Allocation Chart - Bar chart showing spending by category */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Suggested Allocation</Text>
          <Text style={styles.subtext}>Based on your selected categories</Text>

          {categoryNames.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <BarChart
                data={{
                  labels: categoryNames.map(name => name.substring(0, 3)), // Shorten names to 3 letters
                  datasets: [{ data: categoryAmounts }],
                }}
                width={Math.max(screenWidth - scale(60), categoryNames.length * 60)} // Ensure enough width
                height={verticalScale(220)}
                yAxisLabel="₱"
                chartConfig={chartConfig}
                verticalLabelRotation={0}
                showValuesOnTopOfBars
                fromZero
              />
            </ScrollView>
          ) : (
            <Text style={[styles.text, { marginTop: 20, textAlign: 'center' }]}>
              No categories selected
            </Text>
          )}
        </View>

        {/* Spending Trend Chart - Line Chart with Categorical Y-Axis */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Top Spending Category</Text>
          <Text style={styles.subtext}>Most spent category per month</Text>
          <LineChart
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [{
                data: trendDataPoints
              }],
            }}
            width={screenWidth - scale(60)}
            height={verticalScale(220)}
            yAxisInterval={1}
            formatYLabel={(value) => {
              // Map the index back to the category name
              const index = Math.round(value);
              if (index >= 0 && index < trendCategories.length) {
                return trendCategories[index].substring(0, 5); // Limit length
              }
              return '';
            }}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(227, 130, 60, ${opacity})`,
              propsForLabels: { fontSize: moderateScale(10), fontFamily: 'Poppins-Regular' },
            }}
            bezier
            style={{
              marginVertical: verticalScale(8),
              borderRadius: moderateScale(16),
            }}
            fromZero
            segments={trendCategories.length > 1 ? trendCategories.length - 1 : 1}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: scale(20),
    paddingBottom: verticalScale(120),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },
  greeting: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    color: COLORS.text,
  },
  subtext: {
    fontSize: moderateScale(14),
    fontFamily: 'Poppins-Regular',
    color: COLORS.textSecondary,
  },
  text: {
    color: COLORS.text,
    fontSize: moderateScale(16),
    fontFamily: 'Poppins-Regular',
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: moderateScale(20),
    padding: scale(20),
    marginBottom: verticalScale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(4) },
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(8),
    elevation: 5,
  },
  carouselContainer: {
    height: verticalScale(200),
    marginBottom: verticalScale(20),
  },
  carouselCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: moderateScale(20),
    padding: scale(20),
    width: screenWidth - scale(40),
    marginRight: 0,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(4) },
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(8),
    elevation: 5,
  },
  cardTitle: {
    fontSize: moderateScale(16),
    color: COLORS.yellow,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: verticalScale(8),
  },
  amount: {
    fontSize: moderateScale(32),
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    color: COLORS.text,
    marginBottom: verticalScale(4),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(12),
  },
  change: {
    color: COLORS.textSecondary,
    fontSize: moderateScale(14),
    fontFamily: 'Poppins-Regular',
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(12),
  },
  actionButtonText: {
    color: COLORS.text,
    fontSize: moderateScale(12),
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#2A265C',
    borderRadius: moderateScale(20),
    padding: scale(24),
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(10) },
    shadowOpacity: 0.5,
    shadowRadius: moderateScale(20),
    elevation: 10,
  },
  modalTitle: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    color: COLORS.yellow,
    marginBottom: verticalScale(16),
  },
  modalText: {
    fontSize: moderateScale(16),
    fontFamily: 'Poppins-Regular',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: verticalScale(24),
    lineHeight: verticalScale(24),
  },
  modalButton: {
    alignSelf: 'flex-end',
  },
  modalButtonText: {
    color: COLORS.yellow,
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
});

export default Home;