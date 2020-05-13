import React, { Component } from 'react';
import './tablemail.module.css';
import Grid from '@material-ui/core/Grid';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import vmService from '../Services/voiceMailService';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    progress: {
    width: '100%',
    '& > * + *': {
        marginTop: theme.spacing(2),
    },
    },
}));
const useStyles2 = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));
/*/////////Definicion de la tabla//////////**/
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'folder', numeric: false, disablePadding: true, label: 'Status' },
    { id: 'from', numeric: true, disablePadding: false, label: 'From' },
    { id: 'to', numeric: true, disablePadding: false, label: 'To' },
    { id: 'duration', numeric: true, disablePadding: false, label: 'Duration' },
];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    //alert(classes)
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                        style={{display:'none'}}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                ''
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};
const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
        color:'#F5F5F5'
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
            style={{backgroundColor:'darkcyan'}}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
          </Typography>
            ) : (
                    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                        VoiceMail
                    </Typography>
                )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

/****************Clase principal ********************/
export default class Tablemail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 'folder',
            selected: [],
            page: 0,
            dense: false,
            rowsPerPage: 5,
            dataVoicemail:[],
            dataArray:{},
            isLoading:false
        }
    }
    succsessMessage = (alert) => {
        toast.success(alert, {
            position: toast.POSITION.TOP_CENTER,
        });
    }
    errorMessage = (alert) => {
        toast.error(alert, {
            position: toast.POSITION.TOP_CENTER,
        });
    }
    //*********Llamadas http****** */
    
    componentDidMount(){
        this.setState({isLoading:true});
        this.callApi();
        
    }
    callMessageId(id,data){
        vmService.retrieveMessageId(id,data)       
        .then(
            (result)=>{
                //this.callApi();
                this.setState({isLoading:false});
                this.succsessMessage("Modified Succsessfuly");
            }
        ).catch(
            err=>{
                this.setState({isLoading:false});
                this.errorMessage("Oh! There is an error: "+err);
            }
        )
    }
    callApi(){
        vmService.retrieveAllVmBoxes()
        .then(res => res.json())
        .then(
            (result) => {
            //console.log(result);
            this.setState({dataArray:result});
            let tempArray=[];
            this.state.dataArray.data.map(
                
                (cn,ix) =>{
                    //format time, I think is mileseconds, it is no in documentation                                       
                    let sec = ((cn.length/1000));
                    tempArray.push(                        
                        {
                            media_id:cn.media_id,
                            "folder":cn.folder,
                            "from":cn.caller_id_name,
                            "to":String(cn.to).substring(0,String(cn.to).indexOf("@")),
                            "duration":sec+" Seconds"
                        }
                    ) 
                    
                }
            )
                    
                    this.setState({dataVoicemail:tempArray});
                    this.setState({isLoading:false});
                    //console.log(this.state.dataVoicemail[0].folder);
            },
            // Nota: es importante manejar errores aquí y no en 
            // un bloque catch() para que no interceptemos errores
            // de errores reales en los componentes.
            (error) => {
                this.setState({isLoading:false});
                console.error(error);
            }
        )
    }
    /**********Fin llamadas http*** */
    handleRequestSort = (event, property) => {
        const isAsc = this.state.orderBy === property && this.state.order === 'asc';
        this.setState({
            order: isAsc ? 'desc' : 'asc',
            orderBy: property
        })
    };

    handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = this.state.dataVoicemail.map((n) => n.name);
            this.setState({
                selected: newSelecteds
            })
            return;
        }
        this.setState({
            selected: []
        })
    };

    handleClick = (event, name) => {
        const selectedIndex = this.state.selected.indexOf(name);
        let newSelected = [];
        let selected = this.state.selected;
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        this.setState({
            selected: newSelected
        })
    };

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        })

    };

    handleChangeRowsPerPage = (event) => {
        this.setState({
            rowsPerPage: parseInt(event.target.value, 10)
        })
        this.setState({
            page: 0
        })
    };

    handleChangeDense = (event) => {
        this.setState({
            dense: event.target.checked
        })
    };
    handleChangeStatus(e){
        this.setState({isLoading:true});
        let data = {data:{"folder":e.target.value}};        
        let temp = [];
        this.state.dataVoicemail.map(
            dt=>{
                temp.push(
                    {
                        media_id:dt.media_id,
                        folder:(dt.media_id===e.target.name)?e.target.value:dt.folder,
                        from:dt.from,
                        to:dt.to,
                        duration:dt.duration
                        
                }
                    
                );
                
            }
        );
        this.callMessageId(e.target.name,data);
        document.getElementsByName(e.target.name)[0].previousSibling.style.color="green";
        this.setState({dataVoicemail:temp});
    }

    isSelected = (name) => this.state.selected.indexOf(name) !== -1;

    render() {
        let emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.dataVoicemail.length - this.state.page * this.state.rowsPerPage);
        return (
            <>
                <h1>Welcome</h1>
                {
                    (this.state.isLoading &&
                        <div className={useStyles.progress}>
                            <LinearProgress />
                            <LinearProgress color="secondary" />
                        </div>)
                }
                
                <div className={useStyles.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12}>
                            <div className={useStyles2.root}>
                                <Paper className={useStyles2.paper} >
                                    <EnhancedTableToolbar numSelected={this.state.selected.length} />
                                    <TableContainer>
                                        <Table
                                            className={useStyles2.table}
                                            aria-labelledby="tableTitle"
                                            size={this.state.dense ? 'small' : 'medium'}
                                            aria-label="enhanced table"
                                        >
                                            <EnhancedTableHead
                                                classes={useStyles2}
                                                numSelected={this.state.selected.length}
                                                order={this.state.order}
                                                orderBy={this.state.orderBy}
                                                //onSelectAllClick={this.handleSelectAllClick.bind(this)}
                                                onRequestSort={this.handleRequestSort.bind(this)}
                                                rowCount={this.state.dataVoicemail.length}
                                            />
                                            <TableBody>
                                                {stableSort(this.state.dataVoicemail, getComparator(this.state.order, this.state.orderBy))
                                                    .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                                    .map((row, index) => {
                                                        const isItemSelected = this.isSelected(row.media_id);
                                                        const labelId = `enhanced-table-checkbox-${index}`;
                                                        
                                                        return (
                                                            <TableRow
                                                                hover
                                                                //onClick={(event) => this.handleClick(event, row.media_id)}
                                                                role="checkbox"
                                                                aria-checked={isItemSelected}
                                                                tabIndex={-1}
                                                                key={row.media_id}
                                                                selected={isItemSelected}
                                                            >
                                                                <TableCell padding="checkbox">
                                                                    <Checkbox
                                                                        style={{display:'none'}}
                                                                        checked={isItemSelected}
                                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                                    />
                                                                </TableCell>
                                                                <TableCell component="th" id={labelId} scope="row" padding="none">
                                                                <FormControl className={useStyles.formControl}>
                                                                    <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                                                                    <Select
                                                                    labelId="demo-simple-select-helper-label"
                                                                    id="demo-simple-select-helper"
                                                                    name={row.media_id}//This is id.
                                                                    value={row.folder}
                                                                    selected={row.folder}
                                                                    onChange={this.handleChangeStatus.bind(this)}
                                                                    inputProps={this.state.isLoading?{ readOnly:  true }:''}
                                                                    >                                                                    
                                                                    <MenuItem value={"new"}>New</MenuItem>
                                                                    <MenuItem value={"deleted"}>Deleted</MenuItem>
                                                                    <MenuItem value={"saved"}>Saved</MenuItem>
                                                                    </Select>
                                                                    <FormHelperText>{this.state.messageResult}</FormHelperText>
                                                                </FormControl>
                                                                    
                                                                    
                                                                </TableCell>
                                                                <TableCell align="right">{row.from}</TableCell>
                                                                <TableCell align="right">{row.to}</TableCell>
                                                                <TableCell align="right">{row.duration}</TableCell>                                                                
                                                            </TableRow>
                                                        );
                                                    })}
                                                {emptyRows > 0 && (
                                                    <TableRow style={{ height: (this.state.dense ? 33 : 53) * emptyRows }}>
                                                        <TableCell colSpan={6} />
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={this.state.dataVoicemail.length}
                                        rowsPerPage={this.state.rowsPerPage}
                                        page={this.state.page}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                </Paper>
                                <FormControlLabel
                                    control={<Switch checked={this.state.dense} onChange={this.handleChangeDense} />}
                                    label="Dense padding"
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <ToastContainer/>
                </div>
            </>
        )
    }
}
