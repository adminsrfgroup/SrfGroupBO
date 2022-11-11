import React from "react";
import SideBar from "@components/SideBar";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { v4 as uuidv4 } from "uuid";
import OrganizationChart from "react-orgchart-nextjs";
import JSONDigger from "json-digger";

import "react-orgchart-nextjs/dist/ChartContainer.css";
import "react-orgchart-nextjs/dist/ChartNode.css";
import { useAdmin } from "../../../lib/admin/hooks/useAdmin";
import { Button } from "primereact/button";

const defaultValueDataSource = {
  id: "n1",
  name: "Taki Eddine Rahal",
  title: "CEO",
  children: []
};

function Organigramme() {
  const {
    entityOrganigrammeSelector,
    getOrganigramme,
    createOrganigramme
  } = useAdmin();

  const orgchart = React.useRef<any>();

  const [ds, setDS] = React.useState(defaultValueDataSource);
  const dsDigger = new JSONDigger(ds, "id", "children");

  const [selectedNodes, setSelectedNodes] = React.useState<any>(new Set());
  const [newNodes, setNewNodes] = React.useState([{ name: "", title: "" }]);
  const [isEditMode, setIsEditMode] = React.useState(true);
  const [isMultipleSelect, setIsMultipleSelect] = React.useState(false);

  React.useEffect(() => {
    getOrganigramme();
  }, []);

  React.useEffect(() => {
    console.log("entityOrganigrammeSelector ", entityOrganigrammeSelector);
    if (entityOrganigrammeSelector?.content) {
      setDS({ ...JSON.parse(entityOrganigrammeSelector.content) });
    }
  }, [entityOrganigrammeSelector]);

  const readSelectedNode = (nodeData: any) => {
    if (isMultipleSelect) {
      setSelectedNodes((prev: any) => new Set(prev.add(nodeData)));
    } else {
      setSelectedNodes(new Set([nodeData]));
    }
  };

  const clearSelectedNode = () => {
    setSelectedNodes(new Set());
  };

  const onNameChange = (e: any, index: any) => {
    newNodes[index].name = e.target.value;
    setNewNodes([...newNodes]);
  };

  const onTitleChange = (e: any, index: any) => {
    newNodes[index].title = e.target.value;
    setNewNodes([...newNodes]);
  };

  const addNewNode = () => {
    setNewNodes((prevNewNodes) => [...prevNewNodes, { name: "", title: "" }]);
  };

  const removeNewNode = (index: any) => {
    setNewNodes((prevNewNodes) => {
      prevNewNodes.splice(index, 1);
      return [...prevNewNodes];
    });
  };

  const getNewNodes = () => {
    const nodes = [];
    for (const node of newNodes) {
      nodes.push({ ...node, id: uuidv4() });
    }
    return nodes;
  };

  const addChildNodes = async () => {
    await dsDigger.addChildren([...selectedNodes][0].id, getNewNodes());
    setDS({ ...dsDigger.ds });
  };

  const addSiblingNodes = async () => {
    await dsDigger.addSiblings([...selectedNodes][0].id, getNewNodes());
    setDS({ ...dsDigger.ds });
  };

  const addRootNode = () => {
    dsDigger.addRoot(getNewNodes()[0]);
    setDS({ ...dsDigger.ds });
  };

  const remove = async () => {
    await dsDigger.removeNodes([...selectedNodes].map((node) => node.id));
    setDS({ ...dsDigger.ds });
    setSelectedNodes(new Set());
  };

  const onMultipleSelectChange = (e: any) => {
    setIsMultipleSelect(e.target.checked);
  };

  const onModeChange = (e: any) => {
    setIsEditMode(e.target.checked);
    if (e.target.checked) {
      orgchart.current?.expandAllNodes();
    }
  };

  const updateOrganigramme = () => {
    const entity = {
      id: entityOrganigrammeSelector?.id,
      content: JSON.stringify(ds)
    };
    createOrganigramme(entity);
  };

  return (
    <div>
      <SideBar />
      <Header />
      <main className="container-main p-2">
        <div className="flex mb-3">
          <div className="flex-1">Organigramme</div>
          <div className="">
            <Button
              label="Update "
              className="p-button-success"
              icon="pi pi-check"
              onClick={updateOrganigramme}
            />
          </div>
        </div>

        <div className="edit-chart-wrapper">
          <section className="toolbar">
            <div className="selected-nodes">
              <div>
                <h4 style={{ display: "inline-block" }}>Selected Node</h4>
                <input
                  style={{ marginLeft: "1rem" }}
                  id="cb-multiple-select"
                  type="checkbox"
                  checked={isMultipleSelect}
                  onChange={onMultipleSelectChange}
                />
                <label htmlFor="cb-multiple-select">Multiple Select</label>
              </div>
              <ul>
                {Array.from(selectedNodes).map((node: any) => (
                  <li key={node.id}>
                    {node.name} - {node.title}
                  </li>
                ))}
              </ul>
            </div>
            <div className="new-nodes">
              <h4>New Nodes</h4>
              <ul>
                {newNodes &&
                  newNodes.map((node, index) => (
                    <li key={index}>
                      <input
                        type="text"
                        placeholder="name"
                        value={node.name}
                        onChange={(e) => onNameChange(e, index)}
                      />
                      <input
                        type="text"
                        placeholder="Role"
                        value={node.title}
                        onChange={(e) => onTitleChange(e, index)}
                      />
                      {newNodes.length === 1 ||
                      index === newNodes.length - 1 ? (
                        <button disabled={!isEditMode} onClick={addNewNode}>
                          +
                        </button>
                      ) : (
                        <button
                          disabled={!isEditMode}
                          onClick={() => removeNewNode(index)}>
                          -
                        </button>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="action-buttons">
              <button disabled={!isEditMode} onClick={addChildNodes}>
                Add Child Nodes
              </button>
              <button disabled={!isEditMode} onClick={addSiblingNodes}>
                Add Sibling Nodes
              </button>
              <button disabled={!isEditMode} onClick={addRootNode}>
                Add Root Node
              </button>
              <button disabled={!isEditMode} onClick={remove}>
                Remove Nodes
              </button>
              <input
                style={{ marginLeft: "1rem" }}
                id="cb-mode"
                type="checkbox"
                checked={isEditMode}
                onChange={onModeChange}
              />
              <label htmlFor="cb-mode">Edit Mode</label>
            </div>
          </section>
          <div>
            <OrganizationChart
              ref={orgchart}
              datasource={ds}
              collapsible={!isEditMode}
              multipleSelect={isMultipleSelect}
              onClickNode={readSelectedNode}
              onClickChart={clearSelectedNode}
              draggable={true}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Organigramme;
