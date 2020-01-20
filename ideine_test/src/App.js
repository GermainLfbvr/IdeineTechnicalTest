import React, {useState} from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import recapTable from "./RecapTable";
import {recursionCheckBoxControl, verifyChild} from "./CheckRules";


function App() {
    let data = require('./data/Sectorisation');

    let [checkBoxControl] = useState(build_check_control(data.data.roots));
    const [ignored, setIgnored] = useState(0);
    let [read, setRead] = useState([]);
    let [write, setWrite] = useState([]);

    const handleChange = (event, key, which) => {
        recursionCheckBoxControl(key, checkBoxControl, which);
        verifyChild(checkBoxControl, 0);
        verifyChild(checkBoxControl, 1);
        setRead(recapTable(checkBoxControl, [], 0));
        setWrite(recapTable(checkBoxControl, [], 1));
        setIgnored(ignored + 1);
    };

    const tree = build_tree(data.data.roots, handleChange, checkBoxControl);

    return (
        <div>
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronRightIcon/>}
            >
                {tree}
            </TreeView>
            <Grid  container direction="row" justify="space-around">
                <Grid item xs={5}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Read</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {read}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={5}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Write</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {write}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
}

function build_check_control(data) {
    let subCheck = [];
    let checkBoxControl = [];

    for (let i = 0; i < data.length; i++) {
        subCheck = build_check_control(data[i].children);
        checkBoxControl.push(
            {
                key: data[i].id,
                checked: [false, false],
                children: subCheck
            },
        )
    }
    return (checkBoxControl);
}

function build_tree(data, handleChange, checkBoxControl) {
    let tree = [];
    let subTree = [];

    for (let i = 0; i < data.length; i++) {
        subTree = build_tree(data[i].children, handleChange, checkBoxControl[i].children);
        tree.push(
            <TreeItem
                key={data[i].id}
                nodeId={data[i].id}
                label={
                    <Grid container spacing={3}>
                        <Grid item xs={5} style={{marginLeft: 20, display: 'flex', alignItems: 'center'}}>
                            {data[i].name}
                        </Grid>
                        <Grid item xs={3}>
                            <Checkbox
                                key={checkBoxControl[i].key}
                                onChange={(event) => handleChange(event, checkBoxControl[i].key, 0)}
                                value="primary"
                                checked={checkBoxControl[i].checked[0]}
                                inputProps={{'aria-label': 'primary checkbox'}}
                                onClick={e => (e.stopPropagation())}
                            />
                            Read
                        </Grid>
                        <Grid item xs={3}>
                            <Checkbox
                                key={checkBoxControl[i].key}
                                onChange={(event) => handleChange(event, checkBoxControl[i].key, 1)}
                                value="primary"
                                checked={checkBoxControl[i].checked[1]}
                                inputProps={{'aria-label': 'primary checkbox'}}
                                onClick={e => (e.stopPropagation())}
                            />
                            Write
                        </Grid>
                    </Grid>
                }
            >
                {subTree}
            </TreeItem>
        )
    }
    return (tree);
}

export default App;