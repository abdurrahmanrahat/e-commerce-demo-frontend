"use client";

import { TOrder } from "@/types/order.type";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

const BRAND = "#DD3333";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: BRAND,
    paddingBottom: 10,
    marginBottom: 20,
  },

  companyName: {
    fontSize: 20,
    fontWeight: "bold",
    color: BRAND,
    marginBottom: 4,
  },

  companySub: {
    fontSize: 10,
    color: "#555",
    marginBottom: 2,
  },

  invoiceBox: {
    alignItems: "flex-end",
  },

  invoiceTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  invoiceMeta: {
    fontSize: 10,
    color: "#444",
  },

  section: {
    marginTop: 20,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: BRAND,
    marginBottom: 8,
  },

  row: {
    flexDirection: "row",
    marginBottom: 3,
  },

  label: {
    width: 120,
    fontSize: 10,
    color: "#777",
  },

  value: {
    fontSize: 10,
    color: "#111",
  },

  table: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: BRAND,
    color: "#fff",
    paddingVertical: 6,
  },

  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },

  tableCell: {
    padding: 6,
    fontSize: 10,
  },

  colImage: { width: "12%" },
  colProduct: { width: "48%" },
  colPrice: { width: "12%", textAlign: "right" },
  colQty: { width: "10%", textAlign: "center" },
  colTotal: { width: "18%", textAlign: "right" },

  productImage: {
    width: 35,
    height: 35,
    borderRadius: 3,
  },

  totalsContainer: {
    marginTop: 15,
    alignItems: "flex-end",
  },

  totalsRow: {
    flexDirection: "row",
    marginBottom: 3,
  },

  totalsLabel: {
    width: 90,
    fontSize: 10,
    color: "#555",
  },

  totalsValue: {
    width: 80,
    fontSize: 10,
    textAlign: "right",
  },

  grandTotalBox: {
    marginTop: 6,
    backgroundColor: BRAND,
    padding: 6,
    borderRadius: 3,
  },

  grandTotalText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 11,
  },

  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 9,
    color: "#777",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 6,
  },
});

export function InvoicePDF({ order }: { order: TOrder }) {
  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-GB");

  const shippingText =
    order.shippingOption === "dhaka"
      ? "Inside Dhaka (1-2 Days)"
      : "Outside Dhaka (3-5 Days)";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}

        <View style={styles.header}>
          <View>
            <Text style={styles.companyName}>Gadgetoria</Text>
            <Text style={styles.companySub}>
              Smart Affordable Problem-Solving Products
            </Text>
            <Text style={styles.companySub}>support@gadgetoria.com</Text>
            <Text style={styles.companySub}>+880-1788888888</Text>
          </View>

          <View style={styles.invoiceBox}>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceMeta}>
              Order No: {order.orderNumber}
            </Text>
            <Text style={styles.invoiceMeta}>Date: {formattedDate}</Text>
            <Text style={styles.invoiceMeta}>
              Payment: {order.paymentMethod}
            </Text>
            <Text style={styles.invoiceMeta}>Status: {order.status}</Text>
          </View>
        </View>

        {/* CUSTOMER INFORMATION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{order.fullName}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{order.phone}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>
              {order.fullAddress}, {order.country}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Shipping</Text>
            <Text style={styles.value}>{shippingText}</Text>
          </View>

          {order.orderNotes && (
            <View style={styles.row}>
              <Text style={styles.label}>Order Notes</Text>
              <Text style={styles.value}>{order.orderNotes}</Text>
            </View>
          )}
        </View>

        {/* PRODUCTS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, styles.colImage]}>Image</Text>
              <Text style={[styles.tableCell, styles.colProduct]}>Product</Text>
              <Text style={[styles.tableCell, styles.colPrice]}>Price</Text>
              <Text style={[styles.tableCell, styles.colQty]}>Qty</Text>
              <Text style={[styles.tableCell, styles.colTotal]}>Total</Text>
            </View>

            {order.orderItems.map((item) => {
              const price = item.product.sellingPrice;
              const total = price * item.quantity;

              return (
                <View key={item._id} style={styles.tableRow}>
                  <View style={[styles.tableCell, styles.colImage]}>
                    {item.product.images?.[0] && (
                      <Image
                        src={item.product.images[0]}
                        style={styles.productImage}
                      />
                    )}
                  </View>

                  <Text style={[styles.tableCell, styles.colProduct]}>
                    {item.product.name}
                  </Text>

                  <Text style={[styles.tableCell, styles.colPrice]}>
                    ${price.toFixed(2)}
                  </Text>

                  <Text style={[styles.tableCell, styles.colQty]}>
                    {item.quantity}
                  </Text>

                  <Text style={[styles.tableCell, styles.colTotal]}>
                    ${total.toFixed(2)}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* TOTALS */}

          <View style={styles.totalsContainer}>
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>Subtotal</Text>
              <Text style={styles.totalsValue}>
                ${order.subtotal.toFixed(2)}
              </Text>
            </View>

            {order?.discountAmount && order?.discountAmount > 0 && (
              <View style={styles.totalsRow}>
                <Text style={styles.totalsLabel}>Discount</Text>
                <Text style={styles.totalsValue}>
                  -${order?.discountAmount.toFixed(2)}
                </Text>
              </View>
            )}

            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>Shipping</Text>
              <Text style={styles.totalsValue}>
                ${order.shippingCost.toFixed(2)}
              </Text>
            </View>

            <View style={styles.grandTotalBox}>
              <Text style={styles.grandTotalText}>
                Total: ${order.total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* FOOTER */}

        <Text style={styles.footer}>
          Thank you for shopping with Gadgetoria. If you have any questions,
          contact support@gadgetoria.com
        </Text>
      </Page>
    </Document>
  );
}
