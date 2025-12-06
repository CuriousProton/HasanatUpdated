// styles/commonStyles.js
// Reusable style definitions

import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows } from './theme';

export const commonStyles = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  
  scrollContent: {
    padding: spacing.lg,
  },
  
  // Cards
  card: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.medium,
  },
  
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  
  // Headers
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
  },
  
  backButton: {
    position: 'absolute',
    left: spacing.lg,
    padding: spacing.sm,
  },
  
  backIcon: {
    fontSize: fontSize.xxl,
    color: colors.primary,
  },
  
  // Buttons
  button: {
    backgroundColor: colors.success,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  
  buttonDisabled: {
    backgroundColor: colors.border.medium,
  },
  
  buttonText: {
    color: colors.text.white,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  
  secondaryButton: {
    backgroundColor: colors.background.tertiary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
  },
  
  secondaryButtonText: {
    color: colors.text.primary,
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
  
  // Inputs
  input: {
    backgroundColor: colors.background.secondary,
    borderWidth: 2,
    borderColor: colors.border.light,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: fontSize.base,
    color: colors.text.primary,
  },
  
  textArea: {
    backgroundColor: colors.background.secondary,
    borderWidth: 2,
    borderColor: colors.border.light,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: fontSize.base,
    minHeight: 100,
    textAlignVertical: 'top',
    color: colors.text.primary,
  },
  
  label: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  
  // Text styles
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
  },
  
  subtitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text.secondary,
  },
  
  bodyText: {
    fontSize: fontSize.base,
    color: colors.text.primary,
    lineHeight: 24,
  },
  
  caption: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
  },
  
  // Badges
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    alignSelf: 'flex-start',
  },
  
  badgeText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  
  // Empty states
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xxxl * 2,
  },
  
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  
  emptyStateText: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  
  emptyStateSubtext: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
  },
  
  // Dividers
  divider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginVertical: spacing.lg,
  },
  
  // Spacing helpers
  mt: {
    sm: { marginTop: spacing.sm },
    md: { marginTop: spacing.md },
    lg: { marginTop: spacing.lg },
    xl: { marginTop: spacing.xl },
  },
  
  mb: {
    sm: { marginBottom: spacing.sm },
    md: { marginBottom: spacing.md },
    lg: { marginBottom: spacing.lg },
    xl: { marginBottom: spacing.xl },
  },
  
  // Flexbox helpers
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});