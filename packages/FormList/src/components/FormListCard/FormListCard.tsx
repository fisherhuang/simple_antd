import {  Card, Button, type CardProps, Dropdown, Popconfirm } from "antd";
import type { FormListFieldData, FormListOperation } from "antd/es/form";
import React, {  } from "react";
import CommonFormList from "@src/components/Common";
import type { IFormItemProps, IFormListProps } from "@src/types";
import ControlItem, { DisplayControl } from "@src/components/Common/ControlItem";
import invariant from "invariant";
import { RemoveButtonComponent } from "../Common/RemoveButton";
import { MoveButtonComponent } from "../Common/MoveButton";
import { AddButtonComponent } from "../Common/AddButton";
import {WithErrorBoundary} from "@src/common/withErrorBoundary";

export type IFormListCardProps=IFormListProps&{
  cardProps?:CardProps
}

const FormListCard:React.FunctionComponent<IFormListCardProps> = (props) => {
  const { items = [] as IFormItemProps[],renderListItem,cardProps,container:Container, ...restPpops } = props;

  invariant(items.length>0,"items不能为空");

  return (
      <CommonFormList
        {...restPpops}
        container={({content:Content,actionBar:ActionBar}:any)=>{
          return <Container>
            <Content></Content>
            <ActionBar></ActionBar>
          </Container>
        }}
        renderListItem={(listItemprops: FormListFieldData&FormListOperation&{index:number,getAddValue?:Function}) => {
          const {add,remove,move,name,index,getAddValue}=listItemprops;
       
          return (
              <Card
                size="small"
                actions={[
                  <Dropdown
                  key={`add-button-${index}`}
                  getPopupContainer={(triggerNode:HTMLElement)=>{
                    return triggerNode.closest(".ant-card-actions")||document.body
                  }}
                  menu={{
                      items:[{
                        label:"前面",
                        key:"prev",
                        onClick:()=>{
                          add(getAddValue?.(),index==0?index:index-1);
                        }
                      },{
                        label:"后面",
                        key:"next",
                        onClick:()=>{
                          add(getAddValue?.(),index+1);
                        }
                    }]
                }}>
                  <AddButtonComponent type="text" size="small" style={{width:"100%",height:"100%",padding:0,margin:0}}/>
                </Dropdown>,
                <Popconfirm 
                key={`remove-button-${index}`} title={"你确定要删除这条数据？"} onConfirm={()=>{remove(index)}}>
                  <RemoveButtonComponent type="text" size="small" style={{width:"100%",height:"100%",padding:0,margin:0}} danger></RemoveButtonComponent>
                </Popconfirm>,
                 <Dropdown
                 key={`move-button-${index}`}
                 getPopupContainer={(triggerNode:HTMLElement)=>{
                   return triggerNode.closest(".ant-card-actions")||document.body
                 }}
                 menu={{
                     items:[{
                       label:"前面",
                       key:"prev",
                       onClick:()=>{
                         move(index,index-1);
                       }
                     },{
                       label:"后面",
                       key:"next",
                       onClick:()=>{
                         move(index,index+1);
                       }
                   }]
               }}>
                    <MoveButtonComponent disabled={index===0} type="text" size="small" style={{width:"100%",height:"100%",padding:0,margin:0}} />
               </Dropdown>       
                ]}
                {...cardProps||{}}
              >
                {items.map((item: IFormItemProps, itemIndex: number) => {
                  return <ControlItem key={`control-${itemIndex}`} item={item||{}} name={name} itemIndex={itemIndex} fieldIndex={index}></ControlItem>
                })}
              </Card>
          )
        }}
      ></CommonFormList>
  );
};

export default WithErrorBoundary(FormListCard);
