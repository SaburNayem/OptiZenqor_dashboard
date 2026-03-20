import DashboardSection from "../../../shared/ui/DashboardSection";
import DataTable from "../../../shared/ui/DataTable";
import InsightCard from "../../../shared/ui/InsightCard";
import { useCategoriesController } from "../controller/categoriesController";

function CategoriesPage() {
  const controller = useCategoriesController();

  return (
    <div className="page-stack">
      <section className="card-grid">
        <InsightCard eyebrow="Categories" title="Active categories" value={controller.categories.length} description="Every store taxonomy group visible to admins in one table." />
        <InsightCard eyebrow="Categories" title="Largest segment" value="Beauty & Personal Care" description="This category currently carries the deepest seeded assortment." />
        <InsightCard eyebrow="Categories" title="Ready groups" value={`${controller.categories.filter((item) => item.readiness === "Ready").length}/${controller.categories.length}`} description="Categories with products assigned and ready for merchandising." />
      </section>

      <DashboardSection title="Category management" subtitle="Taxonomy shared across the website and mobile app browsing experiences.">
        <DataTable
          columns={["Category", "Icon", "Banner title", "Products", "State"]}
          rows={controller.categories.map((category) => (
            <tr key={category.id}>
              <td>
                <div className="identity-cell">
                  <strong>{category.name}</strong>
                  <span>{category.id}</span>
                </div>
              </td>
              <td>{category.icon}</td>
              <td>{category.bannerTitle}</td>
              <td>{category.productCount}</td>
              <td>{category.readiness}</td>
            </tr>
          ))}
        />
      </DashboardSection>
    </div>
  );
}

export default CategoriesPage;
