import * as React from 'react';
import PropTypes from 'prop-types';
import {
  BaseTimePickerProps,
  useTimePickerDefaultizedProps,
  timePickerValueManager,
} from '../TimePicker/shared';
import { TimePickerToolbar } from '../TimePicker/TimePickerToolbar';
import {
  DesktopWrapper,
  DesktopWrapperProps,
  DesktopWrapperSlotsComponent,
  DesktopWrapperSlotsComponentsProps,
} from '../internals/components/wrappers/DesktopWrapper';
import { CalendarOrClockPicker } from '../internals/components/CalendarOrClockPicker';
import { useTimeValidation } from '../internals/hooks/validation/useTimeValidation';
import { KeyboardDateInput } from '../internals/components/KeyboardDateInput';
import { usePickerState } from '../internals/hooks/usePickerState';
import {
  ClockPickerSlotsComponent,
  ClockPickerSlotsComponentsProps,
} from '../ClockPicker/ClockPicker';
import { DateInputSlotsComponent } from '../internals/components/PureDateInput';

export interface DesktopTimePickerSlotsComponent
  extends DesktopWrapperSlotsComponent,
    ClockPickerSlotsComponent,
    DateInputSlotsComponent {}

export interface DesktopTimePickerSlotsComponentsProps
  extends DesktopWrapperSlotsComponentsProps,
    ClockPickerSlotsComponentsProps {}

export interface DesktopTimePickerProps<TInputDate, TDate>
  extends BaseTimePickerProps<TInputDate, TDate>,
    DesktopWrapperProps {
  /**
   * Overrideable components.
   * @default {}
   */
  components?: Partial<DesktopTimePickerSlotsComponent>;
  /**
   * The props used for each component slot.
   * @default {}
   */
  componentsProps?: Partial<DesktopTimePickerSlotsComponentsProps>;
}

type DesktopTimePickerComponent = (<TInputDate, TDate = TInputDate>(
  props: DesktopTimePickerProps<TInputDate, TDate> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element) & { propTypes?: any };

/**
 *
 * Demos:
 *
 * - [Time Picker](https://mui.com/x/react-date-pickers/time-picker/)
 *
 * API:
 *
 * - [DesktopTimePicker API](https://mui.com/x/api/date-pickers/desktop-time-picker/)
 */
export const DesktopTimePicker = React.forwardRef(function DesktopTimePicker<
  TInputDate,
  TDate = TInputDate,
>(inProps: DesktopTimePickerProps<TInputDate, TDate>, ref: React.Ref<HTMLDivElement>) {
  const props = useTimePickerDefaultizedProps<
    TInputDate,
    TDate,
    DesktopTimePickerProps<TInputDate, TDate>
  >(inProps, 'MuiDesktopTimePicker');

  const validationError = useTimeValidation(props) !== null;
  const { pickerProps, inputProps, wrapperProps } = usePickerState(props, timePickerValueManager);

  const {
    onChange,
    PaperProps,
    PopperProps,
    ToolbarComponent = TimePickerToolbar,
    TransitionComponent,
    value,
    components,
    componentsProps,
    ...other
  } = props;
  const DateInputProps = {
    ...inputProps,
    ...other,
    components,
    componentsProps,
    ref,
    validationError,
  };

  return (
    <DesktopWrapper
      {...wrapperProps}
      DateInputProps={DateInputProps}
      KeyboardDateInputComponent={KeyboardDateInput}
      PopperProps={PopperProps}
      PaperProps={PaperProps}
      TransitionComponent={TransitionComponent}
      components={components}
      componentsProps={componentsProps}
    >
      <CalendarOrClockPicker
        {...pickerProps}
        autoFocus
        toolbarTitle={props.label || props.toolbarTitle}
        ToolbarComponent={ToolbarComponent}
        DateInputProps={DateInputProps}
        components={components}
        componentsProps={componentsProps}
        {...other}
      />
    </DesktopWrapper>
  );
}) as DesktopTimePickerComponent;

DesktopTimePicker.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Regular expression to detect "accepted" symbols.
   * @default /\dap/gi
   */
  acceptRegex: PropTypes.instanceOf(RegExp),
  /**
   * 12h/24h view for hour selection clock.
   * @default `utils.is12HourCycleInCurrentLocale()`
   */
  ampm: PropTypes.bool,
  /**
   * Display ampm controls under the clock (instead of in the toolbar).
   * @default false
   */
  ampmInClock: PropTypes.bool,
  children: PropTypes.node,
  /**
   * className applied to the root component.
   */
  className: PropTypes.string,
  /**
   * If `true` the popup or dialog will immediately close after submitting full date.
   * @default `true` for Desktop, `false` for Mobile (based on the chosen wrapper and `desktopModeMediaQuery` prop).
   */
  closeOnSelect: PropTypes.bool,
  /**
   * Overrideable components.
   * @default {}
   */
  components: PropTypes.object,
  /**
   * The props used for each component slot.
   * @default {}
   */
  componentsProps: PropTypes.object,
  /**
   * If `true`, the picker and text field are disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Do not ignore date part when validating min/max time.
   * @default false
   */
  disableIgnoringDatePartForTimeValidation: PropTypes.bool,
  /**
   * Disable mask on the keyboard, this should be used rarely. Consider passing proper mask for your format.
   * @default false
   */
  disableMaskedInput: PropTypes.bool,
  /**
   * Do not render open picker button (renders only text field with validation).
   * @default false
   */
  disableOpenPicker: PropTypes.bool,
  /**
   * Accessible text that helps user to understand which time and view is selected.
   * @template TDate
   * @param {ClockPickerView} view The current view rendered.
   * @param {TDate | null} time The current time.
   * @param {MuiPickersAdapter<TDate>} adapter The current date adapter.
   * @returns {string} The clock label.
   * @deprecated Use the `localeText` prop of `LocalizationProvider` instead, see https://mui.com/x/react-date-pickers/localization
   * @default <TDate extends any>(
   *   view: ClockView,
   *   time: TDate | null,
   *   adapter: MuiPickersAdapter<TDate>,
   * ) =>
   *   `Select ${view}. ${
   *     time === null ? 'No time selected' : `Selected time is ${adapter.format(time, 'fullTime')}`
   *   }`
   */
  getClockLabelText: PropTypes.func,
  /**
   * Get aria-label text for control that opens picker dialog. Aria-label text must include selected date. @DateIOType
   * @template TInputDate, TDate
   * @param {TInputDate} date The date from which we want to add an aria-text.
   * @param {MuiPickersAdapter<TDate>} utils The utils to manipulate the date.
   * @returns {string} The aria-text to render inside the dialog.
   * @default (date, utils) => `Choose date, selected date is ${utils.format(utils.date(date), 'fullDate')}`
   */
  getOpenDialogAriaText: PropTypes.func,
  ignoreInvalidInputs: PropTypes.bool,
  /**
   * Props to pass to keyboard input adornment.
   */
  InputAdornmentProps: PropTypes.object,
  /**
   * Format string.
   */
  inputFormat: PropTypes.string,
  InputProps: PropTypes.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.object,
    }),
  ]),
  label: PropTypes.node,
  /**
   * Custom mask. Can be used to override generate from format. (e.g. `__/__/____ __:__` or `__/__/____ __:__ _M`).
   */
  mask: PropTypes.string,
  /**
   * Max time acceptable time.
   * For input validation date part of passed object will be ignored if `disableIgnoringDatePartForTimeValidation` not specified.
   */
  maxTime: PropTypes.any,
  /**
   * Min time acceptable time.
   * For input validation date part of passed object will be ignored if `disableIgnoringDatePartForTimeValidation` not specified.
   */
  minTime: PropTypes.any,
  /**
   * Step over minutes.
   * @default 1
   */
  minutesStep: PropTypes.number,
  /**
   * Callback fired when date is accepted @DateIOType.
   * @template TValue
   * @param {TValue} value The value that was just accepted.
   */
  onAccept: PropTypes.func,
  /**
   * Callback fired when the value (the selected date) changes @DateIOType.
   * @template TValue
   * @param {TValue} value The new parsed value.
   * @param {string} keyboardInputValue The current value of the keyboard input.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see open).
   */
  onClose: PropTypes.func,
  /**
   * Callback that fired when input value or new `value` prop validation returns **new** validation error (or value is valid after error).
   * In case of validation error detected `reason` prop return non-null value and `TextField` must be displayed in `error` state.
   * This can be used to render appropriate form error.
   *
   * [Read the guide](https://next.material-ui-pickers.dev/guides/forms) about form integration and error displaying.
   * @DateIOType
   *
   * @template TError, TInputValue
   * @param {TError} reason The reason why the current value is not valid.
   * @param {TInputValue} value The invalid value.
   */
  onError: PropTypes.func,
  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   */
  onOpen: PropTypes.func,
  /**
   * Callback fired on view change.
   * @param {ClockPickerView} view The new view.
   */
  onViewChange: PropTypes.func,
  /**
   * Control the popup or dialog open state.
   */
  open: PropTypes.bool,
  /**
   * Props to pass to keyboard adornment button.
   */
  OpenPickerButtonProps: PropTypes.object,
  /**
   * First view to show.
   */
  openTo: PropTypes.oneOf(['hours', 'minutes', 'seconds']),
  /**
   * Force rendering in particular orientation.
   */
  orientation: PropTypes.oneOf(['landscape', 'portrait']),
  /**
   * Paper props passed down to [Paper](https://mui.com/material-ui/api/paper/) component.
   */
  PaperProps: PropTypes.object,
  /**
   * Popper props passed down to [Popper](https://mui.com/material-ui/api/popper/) component.
   */
  PopperProps: PropTypes.object,
  /**
   * Make picker read only.
   * @default false
   */
  readOnly: PropTypes.bool,
  /**
   * The `renderInput` prop allows you to customize the rendered input.
   * The `props` argument of this render prop contains props of [TextField](https://mui.com/material-ui/api/text-field/#props) that you need to forward.
   * Pay specific attention to the `ref` and `inputProps` keys.
   * @example ```jsx
   * renderInput={props => <TextField {...props} />}
   * ````
   * @param {MuiTextFieldPropsType} props The props of the input.
   * @returns {React.ReactNode} The node to render as the input.
   */
  renderInput: PropTypes.func.isRequired,
  /**
   * Custom formatter to be passed into Rifm component.
   * @param {string} str The un-formatted string.
   * @returns {string} The formatted string.
   */
  rifmFormatter: PropTypes.func,
  /**
   * Dynamically check if time is disabled or not.
   * If returns `false` appropriate time point will ot be acceptable.
   * @param {number} timeValue The value to check.
   * @param {ClockPickerView} clockType The clock type of the timeValue.
   * @returns {boolean} Returns `true` if the time should be disabled
   */
  shouldDisableTime: PropTypes.func,
  /**
   * If `true`, show the toolbar even in desktop mode.
   */
  showToolbar: PropTypes.bool,
  /**
   * Component that will replace default toolbar renderer.
   * @default TimePickerToolbar
   */
  ToolbarComponent: PropTypes.elementType,
  /**
   * Mobile picker title, displaying in the toolbar.
   * @default 'Select time'
   */
  toolbarTitle: PropTypes.node,
  /**
   * Custom component for popper [Transition](https://mui.com/material-ui/transitions/#transitioncomponent-prop).
   */
  TransitionComponent: PropTypes.elementType,
  /**
   * The value of the picker.
   */
  value: PropTypes.any,
  /**
   * Array of views to show.
   */
  views: PropTypes.arrayOf(PropTypes.oneOf(['hours', 'minutes', 'seconds']).isRequired),
} as any;
