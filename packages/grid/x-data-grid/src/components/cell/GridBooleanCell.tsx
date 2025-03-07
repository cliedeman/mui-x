import * as React from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { GridRenderCellParams } from '../../models/params/gridCellParams';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { DataGridProcessedProps } from '../../models/props/DataGridProps';
import { GridColDef } from '../../models/colDef/gridColDef';

type OwnerState = { classes: DataGridProcessedProps['classes'] };

const useUtilityClasses = (ownerState: OwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['booleanCell'],
  };

  return composeClasses(slots, getDataGridUtilityClass, classes);
};

interface GridBooleanCellProps
  extends GridRenderCellParams,
    Omit<SvgIconProps, 'tabIndex' | 'id'> {}

export const GridBooleanCell = React.memo((props: GridBooleanCellProps) => {
  const {
    id,
    value,
    formattedValue,
    api,
    field,
    row,
    rowNode,
    colDef,
    cellMode,
    isEditable,
    hasFocus,
    tabIndex,
    getValue,
    ...other
  } = props;

  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const ownerState = { classes: rootProps.classes };
  const classes = useUtilityClasses(ownerState);

  const Icon = React.useMemo(
    () =>
      value ? rootProps.components.BooleanCellTrueIcon : rootProps.components.BooleanCellFalseIcon,
    [rootProps.components.BooleanCellFalseIcon, rootProps.components.BooleanCellTrueIcon, value],
  );

  return (
    <Icon
      fontSize="small"
      className={classes.root}
      titleAccess={apiRef.current.getLocaleText(
        value ? 'booleanCellTrueLabel' : 'booleanCellFalseLabel',
      )}
      data-value={Boolean(value)}
      {...other}
    />
  );
});

export const renderBooleanCell: GridColDef['renderCell'] = (params: GridBooleanCellProps) => {
  if (params.rowNode.isAutoGenerated) {
    return '';
  }

  return <GridBooleanCell {...params} />;
};
