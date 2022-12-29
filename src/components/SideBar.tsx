import Link from "next/link";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Card } from "primereact/card";

const SideBar = () => (
  <div className="container-side-bar">
    <Card title="SrfGroup">
      <p className="m-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed
        consequuntur error repudiandae numquam deserunt quisquam repellat libero
        asperiores earum nam nobis, culpa ratione quam perferendis esse,
        cupiditate neque quas!
      </p>
    </Card>
    <Accordion multiple>
      <AccordionTab header="Dashboard Mangment">
        <ul>
          <li className="py-4">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="py-4">
            <Link href="/dashboard/logs">Logs</Link>
          </li>

          <li className="py-4">
            <Link href="/dashboard/organigramme">Organigramme</Link>
          </li>
        </ul>
      </AccordionTab>
      <AccordionTab header="User Mangment">
        <ul>
          <li className="py-4">
            <Link href="/user/list-users">List users</Link>
          </li>
          <li className="py-4">
            <Link href="/about">Add user</Link>
          </li>
        </ul>
      </AccordionTab>
      <AccordionTab header="Role Mangment">
        <ul>
          <li className="py-4">
            <Link href="/role/list-roles">List roles</Link>
          </li>
          <li className="py-4">
            <Link href="/role/add-role">Add Role</Link>
          </li>
          <li className="py-4">
            <Link href="/role/list-permissions">List permissions</Link>
          </li>
          <li className="py-4">
            <Link href="/role/add-permission">Add permission</Link>
          </li>
        </ul>
      </AccordionTab>
      <AccordionTab header="Offer Mangment">
        <ul>
          <li className="py-4">
            <Link href="/offer/list-offers">List offers</Link>
          </li>

          <li className="py-4">
            <Link href="/offer/list-advertising-offers">List advertisings</Link>
          </li>

          <li className="py-4">
            <Link href="/offer/statistics">Statistics offers</Link>
          </li>

          <li className="py-4">
            <Link href="/offer/description-add-offer/description-new-offer">
              Description new offer
            </Link>
          </li>
        </ul>
      </AccordionTab>

      <AccordionTab header="Home Mangment">
        <ul>
          <li className="py-4">
            <Link href="/home/top-slides-images">Top Slides Images</Link>
          </li>
          <li className="py-4">
            <Link href="/home/feature-home">Feature Home</Link>
          </li>
        </ul>
      </AccordionTab>

      <AccordionTab header="Support Mangment">
        <ul>
          <li className="py-4">
            <Link href="/contact-us">Contact us</Link>
          </li>
          <li className="py-4">
            <Link href="/about-us">About US</Link>
          </li>
          <li className="py-4">
            <Link href="/faq">FAQ</Link>
          </li>
          <li className="py-4">
            <Link href="/news-letter">NewsLetter</Link>
          </li>
          <li className="py-4">
            <Link href="/declaration">Declaration</Link>
          </li>
          <li className="py-4">
            <Link href="/cgu/list-cgu">CGU</Link>
          </li>
        </ul>
      </AccordionTab>

      <AccordionTab header="Category Mangment">
        <ul>
          <li className="py-4">
            <Link href="/category/list-categories">List categories</Link>
          </li>
          <li className="py-4">
            <Link href="/category/add-category">Add category</Link>
          </li>
        </ul>
      </AccordionTab>

      <AccordionTab header="Address Mangment">
        <ul>
          <li className="py-4">
            <Link href="/address/list-address">List address</Link>
          </li>
          <li>
            <Link href="/about">Add address</Link>
          </li>
        </ul>
      </AccordionTab>
    </Accordion>
  </div>
);

export default SideBar;
