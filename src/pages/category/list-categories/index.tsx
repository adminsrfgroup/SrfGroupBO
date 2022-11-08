import React from "react";
import SideBar from "../../../components/SideBar";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "primereact/button";
import {
  entitiesCategories,
  importSuccessCategories,
  /*loadingEntitiesCategories, */ fetchCategories,
  resetCategories,
  importCategories,
  updateIndexCategory
} from "@store/category/slice";
import { ICategory } from "../../../lib/models/category.model";
import { useRouter } from "next/router";
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle
} from "react-beautiful-dnd";
import { Image } from "primereact/image";

// a little function to help us with reordering the result
const reorder = (
  list: ICategory[],
  startIndex: number,
  endIndex: number
): ICategory[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  getIndexByCategories(list, startIndex, endIndex);
  return result;
};

const grid = 8;

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
): React.CSSProperties => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
  background: isDraggingOver ? "lightblue" : "lightgrey"
  // padding: grid,
  // width: 250
});

let finalListItems: ICategory[] = [];

interface IndexCategory {
  id?: number;
  index?: number;
}

const getIndexByCategories = (
  items: ICategory[],
  startIndex: number,
  endIndex: number
): IndexCategory[] => {
  console.log("startIndex ", startIndex);
  console.log("endIndex ", endIndex);
  const result = items.map((item: ICategory) => {
    if (item.index === startIndex) {
      return {
        id: item.id,
        index: endIndex
      };
    } else if (item.index === endIndex) {
      return {
        id: item.id,
        index: startIndex
      };
    }

    return {
      id: item.id,
      index: item.index
    };
  });

  finalListItems = result.slice();

  return result;
};
function DraggableList({
  listCategories,
  callbackList
}: {
  listCategories: ICategory[];
  callbackList: any;
}) {
  const [state, setState] = React.useState(listCategories);

  const router = useRouter();

  const onDragEnd = (result: DropResult): void => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items: ICategory[] = reorder(
      state,
      result.source.index,
      result.destination.index
    );
    setState(items);
    callbackList(finalListItems);
  };

  const editItem = (item: ICategory) => {
    router.push("/category/edit-category/" + item.id);
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot): JSX.Element => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}>
            <div className="card">
              <div className="flex card-container indigo-container">
                <div className="flex-1 h-4rem bg-brown text-white font-bold text-center p-4 border-round">
                  id
                </div>
                <div className="flex-1 h-4rem bg-brown text-white font-bold text-center p-4 border-round mx-4">
                  Image
                </div>
                <div className="flex-1 h-4rem bg-brown text-white font-bold text-center p-4 border-round mx-4">
                  titleAr
                </div>
                <div className="flex-1 h-4rem bg-brown text-white font-bold text-center p-4 border-round mx-4">
                  titleFr
                </div>
                <div className="flex-1 h-4rem bg-brown text-white font-bold text-center p-4 border-round mx-4">
                  titleEn
                </div>
                <div className="flex-1 h-4rem bg-brown text-white font-bold text-center p-4 border-round">
                  Actions
                </div>
              </div>
            </div>
            {state.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={`item-${item.id}`}
                index={index}>
                {(provided, snapshot): JSX.Element => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}>
                    <div className="card">
                      <div className="flex card-container indigo-container">
                        <div className="flex-1 bg-gray-500 text-white font-bold text-center p-4 border-round">
                          {item.id}
                        </div>
                        <div className="flex-1 bg-gray-500 text-white font-bold text-center p-4 border-round mx-4">
                          <Image
                            src={item.imageContent || ""}
                            alt="Image"
                            width="100"
                          />
                        </div>
                        <div className="flex-1 bg-gray-500 text-white font-bold text-center p-4 border-round mx-4">
                          {item.titleAr}
                        </div>
                        <div className="flex-1 bg-gray-500 text-white font-bold text-center p-4 border-round mx-4">
                          {item.titleFr}
                        </div>
                        <div className="flex-1 bg-gray-500 text-white font-bold text-center p-4 border-round mx-4">
                          {item.titleEn}
                        </div>
                        <div className="flex-1 bg-gray-500 text-white font-bold text-center p-4 border-round">
                          <Button className="" onClick={() => editItem(item)}>
                            Edit
                          </Button>
                          <Button label="Delete" className="p-button-danger" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default function ListCategories() {
  const [isBrowser, setIsBrowser] = React.useState(false);
  const [listIndexCategories, setListIndexCategories] = React.useState<
    ICategory[]
  >([]);

  const dispatch = useDispatch();
  const router = useRouter();

  // const loadingEntitiesCategoriesSelector = useSelector(loadingEntitiesCategories) ?? false;
  const importSuccessCategoriesSelector =
    useSelector(importSuccessCategories) ?? false;
  const entitiesCategoriesSelector: ICategory[] =
    useSelector(entitiesCategories) ?? [];

  React.useEffect(() => {
    dispatch(resetCategories({}));
    dispatch(
      fetchCategories({
        page: 0,
        size: 20,
        queryParams: ""
      })
    );

    setIsBrowser(typeof window === "undefined" ? false : true);
  }, []);

  const importActionCategories = () => {
    dispatch(importCategories({}));
    // props.importEntities();
  };

  React.useEffect(() => {
    if (importSuccessCategoriesSelector) {
      dispatch(resetCategories({}));
      dispatch(
        fetchCategories({
          page: 0,
          size: 20,
          queryParams: ""
        })
      );
    }
  }, [importSuccessCategoriesSelector]);

  const redirect = (path: string) => {
    router.push(path);
  };

  const newListCategories = (list: ICategory[]): void => {
    setListIndexCategories(list);
  };

  const sortIndex = () => {
    if (listIndexCategories.length) {
      dispatch(updateIndexCategory(listIndexCategories));
    }
  };

  return (
    <div>
      <SideBar />
      <Header />
      <main className="container-main p-3">
        <div className="card">
          <div className="flex mb-3">
            <div className="flex-1">List of categories</div>
            <div className="">
              <Button
                label="ReOrder index"
                className="p-button-success mr-1"
                icon="pi pi-check"
                onClick={() => sortIndex()}
              />
              <Button
                label="Import "
                className="p-button-success"
                icon="pi pi-check"
                onClick={() => importActionCategories()}
                disabled={entitiesCategoriesSelector?.length ? true : false}
              />
              <Button
                label="Add new Category"
                className="p-button-link"
                onClick={() => redirect("/category/add-category")}
              />
            </div>
          </div>

          {isBrowser && entitiesCategoriesSelector.length ? (
            <DraggableList
              listCategories={entitiesCategoriesSelector}
              callbackList={newListCategories}
            />
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}
