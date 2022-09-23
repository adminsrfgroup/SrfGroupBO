import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";

const Header = () => {
  const items = [
    {
      label: "File",
      icon: "pi pi-fw pi-file",
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-plus",
          items: [
            {
              label: "Bookmark",
              icon: "pi pi-fw pi-bookmark"
            },
            {
              label: "Video",
              icon: "pi pi-fw pi-video"
            }
          ]
        },
        {
          label: "Delete",
          icon: "pi pi-fw pi-trash"
        },
        {
          separator: true
        },
        {
          label: "Export",
          icon: "pi pi-fw pi-external-link"
        }
      ]
    },
    {
      label: "Edit",
      icon: "pi pi-fw pi-pencil",
      items: [
        {
          label: "Left",
          icon: "pi pi-fw pi-align-left"
        },
        {
          label: "Right",
          icon: "pi pi-fw pi-align-right"
        },
        {
          label: "Center",
          icon: "pi pi-fw pi-align-center"
        },
        {
          label: "Justify",
          icon: "pi pi-fw pi-align-justify"
        }
      ]
    },
    {
      label: "Users",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-user-plus"
        },
        {
          label: "Delete",
          icon: "pi pi-fw pi-user-minus"
        },
        {
          label: "Search",
          icon: "pi pi-fw pi-users",
          items: [
            {
              label: "Filter",
              icon: "pi pi-fw pi-filter",
              items: [
                {
                  label: "Print",
                  icon: "pi pi-fw pi-print"
                }
              ]
            },
            {
              icon: "pi pi-fw pi-bars",
              label: "List"
            }
          ]
        }
      ]
    },
    {
      label: "Events",
      icon: "pi pi-fw pi-calendar",
      items: [
        {
          label: "Edit",
          icon: "pi pi-fw pi-pencil",
          items: [
            {
              label: "Save",
              icon: "pi pi-fw pi-calendar-plus"
            },
            {
              label: "Delete",
              icon: "pi pi-fw pi-calendar-minus"
            }
          ]
        },
        {
          label: "Archieve",
          icon: "pi pi-fw pi-calendar-times",
          items: [
            {
              label: "Remove",
              icon: "pi pi-fw pi-calendar-minus"
            }
          ]
        }
      ]
    },
    {
      label: "Quit",
      icon: "pi pi-fw pi-power-off",
      command: () => {
        // logoutCallback();
      }
    }
  ];

  const start = (
    <img
      alt="logo"
      src="showcase/images/logo.png"
      onError={(e: any) =>
        (e.target.src =
          "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
      }
      height="40"
      className="mr-2"></img>
  );
  const end = <InputText placeholder="Search" type="text" />;

  return (
    <header>
      <Menubar model={items} start={start} end={end} />
    </header>
  );
};

export default Header;
