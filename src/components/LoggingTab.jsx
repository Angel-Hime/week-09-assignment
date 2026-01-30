"use client";

import * as Tabs from "@radix-ui/react-tabs";
import styles from "@/styles/loggingTabStyles.module.css";

export default function TabComponent() {
  return (
    <Tabs.Root className={styles.Root} defaultValue="tab1">
      <Tabs.List className={styles.List} aria-label=" ">
        <Tabs.Trigger className={styles.Trigger} value="tab1"></Tabs.Trigger>

        <Tabs.Trigger className={styles.Trigger} value="tab2"></Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content className={styles.Content} value="tab1">
        {/*    */}
      </Tabs.Content>
      <Tabs.Content className={styles.Content} value="tab2">
        {/*   */}
      </Tabs.Content>
    </Tabs.Root>
  );
}
