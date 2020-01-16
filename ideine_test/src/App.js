import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
        height: 216,
        flexGrow: 1,
        maxWidth: 400,
    },
}));

function App() {
    let data = require('./data/Sectorisation');
    const classes = useStyles();
    let tree = build_tree(data.data.roots);

    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ChevronRightIcon/>}
        >
            {tree}
        </TreeView>
    );
}

function build_tree(data) {
    let tree = [];
    let subTree = [];

    for (let i = 0; i < data.length; i++) {
      subTree = build_tree(data[i].children);
      tree.push(
          <TreeItem nodeId={data[i].id} label={data[i].name}>{subTree}</TreeItem>
      )
    }
    console.log(subTree);
    return (tree);
}

export default App;