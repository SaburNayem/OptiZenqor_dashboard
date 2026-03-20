import DashboardSection from "../../../shared/ui/DashboardSection";
import DataTable from "../../../shared/ui/DataTable";
import SideDetailPanel from "../../../shared/feedback/SideDetailPanel";
import StatusBadge from "../../../shared/ui/StatusBadge";
import OrderStatusSelect from "../components/OrderStatusSelect";
import { useOrdersController } from "../controller/ordersController";

function OrdersPage() {
  const controller = useOrdersController();

  return (
    <div className="page-stack">
      <section className="content-grid">
        <div className="primary-column">
          <DashboardSection title="Order management" subtitle="Track app and website orders from placement to fulfillment.">
            <DataTable
              columns={["Order", "Customer", "Source", "Items", "Total", "Status"]}
              rows={controller.orders.map((order) => (
                <tr key={order.id} onClick={() => controller.setActiveOrderId(order.id)}>
                  <td>{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>{order.source}</td>
                  <td>{order.itemCount}</td>
                  <td>${order.total}</td>
                  <td>
                    <StatusBadge value={order.status} toneMap={controller.toneMap} />
                  </td>
                </tr>
              ))}
            />
          </DashboardSection>
        </div>

        <div className="secondary-column">
          <SideDetailPanel title="Order detail" subtitle="Inspect and update the selected order.">
            {controller.activeOrder ? (
              <div className="feature-list">
                <article className="feature-card">
                  <h3>{controller.activeOrder.id}</h3>
                  <p>{controller.activeOrder.customerName} • {controller.activeOrder.source}</p>
                  <p>{controller.activeOrder.address}</p>
                </article>
                <article className="feature-card">
                  <h3>Items</h3>
                  <div className="pill-grid">
                    {controller.activeOrder.items.map((item) => (
                      <span key={item} className="filter-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
                <article className="feature-card">
                  <h3>Status control</h3>
                  <OrderStatusSelect
                    value={controller.activeOrder.status}
                    onChange={(status) => controller.updateOrderStatus(controller.activeOrder.id, status)}
                  />
                </article>
              </div>
            ) : null}
          </SideDetailPanel>
        </div>
      </section>
    </div>
  );
}

export default OrdersPage;
